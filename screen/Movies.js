import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import Swiper from "react-native-swiper";

import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import UpComing from "../components/UpComing";

export default function Movies() {
  const [nowPlayingData, setNowPlaying] = useState([]);
  const [topRatedData, setTopRated] = useState([]);
  const [upComingData, setUpComing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setItRefreshing] = useState(false);

  const getNowPlayingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=3cc2f8f41df6043f8268cd5597421998&language=en-US&page=1"
    ).then((res) => res.json());
    setNowPlaying(response.results);
  };
  const getTopRatedMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=3cc2f8f41df6043f8268cd5597421998&language=en-US&page=1"
    ).then((res) => res.json());
    setTopRated(response.results);
  };
  const getUpComingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=3cc2f8f41df6043f8268cd5597421998&language=en-US&page=1"
    ).then((res) => res.json());
    setUpComing(response.results);
  };

  const onRefreshing = async () => {
    setItRefreshing(true);
    await getData();
    setItRefreshing(false);
  };
  const getData = async () => {
    await Promise.all([
      getNowPlayingMovies(),
      getTopRatedMovies(),
      getUpComingMovies(),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FlatList
            refreshing={isRefreshing}
            onRefresh={onRefreshing}
            ListHeaderComponent={
              <>
                <ListTitle>Now Playing</ListTitle>
                <Swiper height={300} showsPagination={false} autoplay loop>
                  {nowPlayingData.map((movie) => (
                    <NowPlaying key={movie.id} movie={movie} />
                  ))}
                </Swiper>
                <ListTitle>Top Rated</ListTitle>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={topRatedData}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <TopRated movie={item} />}
                />
                <ListTitle>Up Coming</ListTitle>
              </>
            }
            data={upComingData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <UpComing movie={item} />}
          />
        </>
      )}
    </>
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
