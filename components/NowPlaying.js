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
import Swiper from "react-native-swiper";

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
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

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return (
    <>
      {isLoading ? (
        <StLoadingView>
          <ActivityIndicator />
        </StLoadingView>
      ) : (
        <Swiper height={300} showsPagination={false} autoplay loop>
          {nowPlaying.map((movie) => (
            <StMainImageView>
              <StImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
                }}
                imageStyle={{ opacity: 0.3 }}
                resizeMode="cover"
              >
                <StMainImageInnerView>
                  <StImageView>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                      }}
                      style={{
                        resizeMode: "cover",
                        width: 134,
                        height: "100%",
                      }}
                    />
                  </StImageView>
                  <StTextWrap>
                    <Text
                      style={{ color: "white" }}
                      numberOfLines={4}
                      ellipsizeMode="tail"
                    >
                      {movie.overview}
                    </Text>
                    <Text style={{ color: "white" }}>
                      {movie.vote_average} / 10
                    </Text>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      {movie.title}
                    </Text>
                    <Text></Text>
                  </StTextWrap>
                </StMainImageInnerView>
              </StImageBackground>
            </StMainImageView>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default NowPlaying;

const StLoadingView = styled.View`
  flex: 1;
  justify-content: center;
  height: 300px;
`;
const StMainImageView = styled.View`
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: black;
`;
const StImageBackground = styled.ImageBackground`
  width: 100%;
`;

const StMainImageInnerView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  margin: 20px;
`;
const StImageView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const StTextWrap = styled.View`
  flex: 1.5;
  flex-direction: column-reverse;
  justify-content: space-between;
  height: 100%;
  margin-left: 20px;
`;
