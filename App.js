import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Stack,
    Text,
    TextInput,
    Button,
    ActivityIndicator,
} from "@react-native-material/core";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/components/Login";
import DashboardAdmin from "./src/components/DashboardAdmin";
import DashboardNGO from "./src/components/DashboardNGO";
import DashboardLister from "./src/components/DashboardLister";
import * as Font from "expo-font";

const ScreenStack = createNativeStackNavigator();

function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
            "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
            "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
            "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        }).then(() => {
            setFontLoaded(true);
        });
    }, []);

    if (!fontLoaded)
        return (
            <Flex center fill>
                <Stack spacing={12}>
                    <Text color="#fb8c00">SafeHouse</Text>
                    <ActivityIndicator size="large" color="#fb8c00" />
                </Stack>
            </Flex>
        );

    return (
        <NavigationContainer>
            <ScreenStack.Navigator initialRouteName="Login">
                <ScreenStack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: "Welcome", headerShown: false }}
                />
                <ScreenStack.Screen
                    name="DashboardAdmin"
                    component={DashboardAdmin}
                    options={{ title: "Admin Panel", headerShown: false }}
                />
                <ScreenStack.Screen
                    name="DashboardNGO"
                    component={DashboardNGO}
                    options={{ title: "NGO Panel", headerShown: false }}
                />
                <ScreenStack.Screen
                    name="DashboardLister"
                    component={DashboardLister}
                    options={{ title: "Lister Panel", headerShown: false }}
                />
            </ScreenStack.Navigator>
        </NavigationContainer>
    );
}

export default App;
