import {
    Flex,
    Stack,
    Text,
    TextInput,
    Button,
} from "@react-native-material/core";
import { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    StatusBar,
    AsyncStorage,
} from "react-native";
import axios from "axios";

let instance = axios.create({
    baseURL: "http://192.168.18.246:3000/",
    timeout: 6000,
    headers: {
        post: {
            "Content-Type": "application/json",
        },
    },
});

export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("");
    const [token, setToken] = useState("");

    const submitForm = async () => {
        console.log(username, password);
        setDisable(true);
        setLoading(true);

        try {
            let res = await instance.post("/api/signin/", {
                username,
                password,
            });

            console.log(res.data.role, res.data.token);
            setRole(res.data.role);
            setToken(res.data.token);

            if (res.data.role.toLowerCase() == "admin") {
                navigation.navigate("DashboardAdmin");
            } else if (res.data.role.toLowerCase() == "ngo") {
                navigation.navigate("DashboardNGO");
            }
        } catch (e) {
            console.log(e);
        }

        setDisable(false);
        setLoading(false);
    };

    useEffect(() => {
        AsyncStorage.setItem("role", role);
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("username", username);
    }, [role, token]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Flex center fill>
                    <Stack spacing={18}>
                        <StatusBar
                            animated={true}
                            backgroundColor={"#8e24aa"}
                            barStyle={"dark-content"}
                        />
                        <Image
                            source={{
                                uri: "../../assets/images/ssscribble4.svg",
                            }}
                            resizeMode="stretch"
                            style={{
                                width: "50%",
                                height: "50%",
                                position: "absolute",
                                zIndex: -1,
                            }}
                        ></Image>
                        <Text variant="h1" style={styles.header}>
                            SafeHouse
                        </Text>
                        <TextInput
                            label="Username"
                            textContentType="username"
                            variant="standard"
                            color="#8e24aa"
                            onChangeText={setUsername}
                            value={username}
                        />
                        <TextInput
                            label="Password"
                            textContentType="password"
                            secureTextEntry={true}
                            variant="standard"
                            color="#8e24aa"
                            onChangeText={setPassword}
                            value={password}
                        />
                        <Button
                            title="Login"
                            variant="contained"
                            color="#fb8c00"
                            titleStyle={{ color: "#fff" }}
                            onPress={submitForm}
                            disabled={disable}
                            loading={loading}
                        ></Button>
                    </Stack>
                </Flex>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        color: "#8e24aa",
        fontSize: "42px",
        fontFamily: "Poppins-Medium",
    },
});
