import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import Stacks from "./Stacks";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* <Stack.Screen name="Stacks" component={Stacks} /> */}
    </Stack.Navigator>
  );
}

export default Root;
