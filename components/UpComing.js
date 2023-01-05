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

const UpComing = ({ movie }) => {
  return (
    <StView>
      <StImage
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        }}
        style={{
          resizeMode: "cover",
        }}
      />
      <StTextView>
        <StTitleText>{movie.title}</StTitleText>
        <StText numberOfLines={4} ellipsizeMode="tail">
          {movie.overview}
        </StText>
      </StTextView>
    </StView>
  );
};

export default UpComing;

const StView = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 10px;
  height: 200px;
  width: 100%;
`;

const StImage = styled.Image`
  flex: 1;
  height: 100%;
`;
const StTextView = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: flex-end;
`;
const StTitleText = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`;
const StText = styled.Text`
  color: white;
`;
