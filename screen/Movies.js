import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import UpComing from "../components/UpComing";

export default function Movies() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upComing, setUpComing] = useState([]);

  const [isRefreshing, setItRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getNowPlayingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=3cc2f8f41df6043f8268cd5597421998&language=en-US&page=1"
      ).then((res) => res.json());
      setNowPlaying(response.results);
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=3cc2f8f41df6043f8268cd5597421998&language=en-US&page=1"
      ).then((res) => res.json());
      setTopRated(response.results);
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  const getUpComingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=3cc2f8f41df6043f8268cd5597421998&language=en-US&page=1"
      ).then((res) => res.json());
      setUpComing(response.results);
      setIsLoading(false);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getData = async () => {
    await Promise.all([
      getNowPlayingMovies(),
      getTopRatedMovies(),
      getUpComingMovies(),
    ]);
  };
  const onRefreshing = async () => {
    setItRefreshing(true);
    await getData();
    setItRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefreshing}
      ListHeaderComponent={
        <View style={{ flex: 1 }}>
          <ListTitle>Now Playing</ListTitle>
          <Swiper height={300} showsPagination={false} autoplay loop>
            {nowPlaying.map((movie) => (
              <NowPlaying key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <ListTitle>Top Rated</ListTitle>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topRated}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TopRated movie={item} />}
          />
          <ListTitle>Up Coming</ListTitle>
        </View>
      }
      data={upComing}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UpComing movie={item} />}
    />
  );
}

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: white;
`;
