import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";

const UpComing = () => {
  const [upComing, setUpComing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    getUpComingMovies();
  }, []);
  return (
    <>
      {isLoading ? (
        <StLoadingView>
          <ActivityIndicator />
        </StLoadingView>
      ) : (
        <StUnderItemWrapView>
          {upComing.map((movie) => (
            <StUnderItemView>
              <StUnderItemImage
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }}
                style={{
                  resizeMode: "cover",
                }}
              />
              <StTitleBodyView>
                <StUnderItemTitle>{movie.title}</StUnderItemTitle>
                <StUnderItemBody numberOfLines={4} ellipsizeMode="tail">
                  {movie.overview}
                </StUnderItemBody>
              </StTitleBodyView>
            </StUnderItemView>
          ))}
        </StUnderItemWrapView>
      )}
    </>
  );
};

export default UpComing;

const StLoadingView = styled.View`
  flex: 1;
  justify-content: center;
  height: 300px;
`;
const StUnderItemWrapView = styled.View`
  flex: 1;
  margin: 10px;
`;
const StUnderItemView = styled.View`
  margin: 10px;
  padding: 10px;
  flex: 1;
  flex-direction: row;
  height: 200px;
  width: 100%;
`;
const StUnderItemImage = styled.Image`
  flex: 1;
  height: 100%;
`;
const StTitleBodyView = styled.View`
  flex: 2;
  margin-left: 10px;
`;
const StUnderItemTitle = styled.Text`
  flex: 1;
  color: white;
`;
const StUnderItemBody = styled.Text`
  flex: 1;
  color: white;
`;
