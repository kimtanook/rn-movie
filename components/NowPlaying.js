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

const NowPlaying = ({ movie }) => {
  return (
    <StContainerView>
      <StImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        }}
        imageStyle={{ opacity: 0.3 }}
        resizeMode="cover"
      >
        <StInnerView>
          <StImageView>
            <StImage
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              }}
              style={{
                resizeMode: "cover",
              }}
            />
          </StImageView>
          <StTextView>
            <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
              {movie.title}
            </Text>
            <Text style={{ color: "white", marginBottom: 5 }}>
              {movie.vote_average} / 10
            </Text>
            <Text
              style={{ color: "white" }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {movie.overview}
            </Text>
          </StTextView>
        </StInnerView>
      </StImageBackground>
    </StContainerView>
  );
};

export default NowPlaying;

const StContainerView = styled.View`
  flex: 1;
`;
const StImageBackground = styled.ImageBackground`
  height: 100%;
`;
const StInnerView = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const StImageView = styled.View``;
const StImage = styled.Image`
  height: 200px;
  width: 135px;
`;
const StTextView = styled.View`
  padding-top: 80px;
  width: 230px;
`;
