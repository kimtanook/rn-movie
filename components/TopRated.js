import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";

const TopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    getTopRatedMovies();
  }, []);
  return (
    <>
      {isLoading ? (
        <StLoadingView>
          <ActivityIndicator />
        </StLoadingView>
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topRated}
          renderItem={({ item }) => (
            <StRowItemView>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
                }}
                style={{
                  resizeMode: "cover",
                  height: "70%",
                }}
              />
              <Text style={{ color: "white" }}>{item.vote_average} / 10</Text>
              <Text
                style={{ color: "white" }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </StRowItemView>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
};

export default TopRated;

const StLoadingView = styled.View`
  flex: 1;
  justify-content: center;
`;

const StRowItemView = styled.View`
  margin: 10px;
  width: 110px;
  height: 200px;
`;
