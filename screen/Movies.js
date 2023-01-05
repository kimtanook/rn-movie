import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import NowPlaying from "../components/NowPlaying";
import TopRated from "../components/TopRated";
import UpComing from "../components/UpComing";

export default function Movies() {
  const [isRefreshing, setItRefreshing] = useState(false);

  const getData = async () => {
    await Promise.all([NowPlaying, TopRated, UpComing]);
  };
  const onRefreshing = async () => {
    setItRefreshing(true);
    await getData();
    setItRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshing} />
      }
    >
      <StWrapView>
        <StatusBar style="auto" />
        <View style={{ flex: 1, alignItems: "center" }}>
          <StComponentTitle>Now Playing</StComponentTitle>
          <StMainContainer>
            <NowPlaying />
          </StMainContainer>
          <StComponentTitle>Top Rated</StComponentTitle>
          <TopRated />
          <StComponentTitle>Up Coming</StComponentTitle>
          <UpComing />
        </View>
      </StWrapView>
    </ScrollView>
  );
}

const StComponentTitle = styled.Text`
  color: #fff650;
  margin: 10px;
`;
const StWrapView = styled.View`
  flex: 1;
  padding: 10px;
  margin: 10px;
`;
const StMainContainer = styled.View`
  flex-direction: row;
`;
