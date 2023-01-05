import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Movies from "../screen/Movies";
import My from "../screen/My";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
      }}
    >
      <Tab.Screen
        options={{
          title: "영화", // 상단 헤더
          headerTitleAlign: "center", // 안드와 ios 기본값 다름
          tabBarLabel: "movies", // 하단 탭바
          tabBarIcon: (
            { color, size } // 기본 컬러, 기본 사이즈
          ) => <MaterialIcons name="local-movies" size={size} color={color} />,
        }}
        name="Movies"
        component={Movies}
      />
      <Tab.Screen
        options={{
          title: "마이페이지", // 상단 헤더
          tabBarLabel: "My", // 하단 탭바
          tabBarBadge: 5,
          tabBarIcon: (
            { color, size } // 기본 컬러, 기본 사이즈
          ) => <Foundation name="social-myspace" size={size} color={color} />,
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  );
}
