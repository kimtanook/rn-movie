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

const TopRated = ({ movie }) => {
  return (
    <StView>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        }}
        style={{
          resizeMode: "cover",
          height: "70%",
        }}
      />
      <Text style={{ color: "white" }}>{movie.vote_average} / 10</Text>
      <Text
        style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {movie.title}
      </Text>
    </StView>
  );
};

export default TopRated;

const StView = styled.View`
  margin: 10px;
  height: 300px;
  width: 150px;
`;
