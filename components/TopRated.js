import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { Image, Text } from "react-native";

const TopRated = ({ movie }) => {
  const { navigate } = useNavigation();
  return (
    <StView
      onPress={() =>
        navigate("Stacks", { screen: "Detail", params: { movieId: movie.id } })
      }
    >
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
