import {
    AppBar,
    Flex,
    IconButton,
    Text,
    Backdrop,
    BackdropSubheader,
    Stack,
    Box,
    HStack,
    Button,
    Switch,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import {
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    SafeAreaView,
    AsyncStorage,
    Image,
    ScrollView,
} from "react-native";
import axios from "axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const DashboardAdmin = () => {
    const [orgs, setOrgs] = useState();
    const [pending, setPending] = useState();
    const [revealed, setRevealed] = useState(false);
    const [token, setToken] = useState(AsyncStorage.getItem("token"));
    const [showNGO, setShowNGO] = useState(true);

    let instance = axios.create({
        baseURL: "http://192.168.18.246:3000",
        timeout: 6000,
        headers: {
            post: {
                "Content-Type": "application/json",
            },
            Authorization: `Bearer ${token._z}`,
        },
    });

    const fetchNGOs = async () => {
        try {
            let res = await instance.get("/api/organizations");
            setOrgs(res.data);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchRequests = async () => {
        try {
            let res = await instance.get("/api/requests/affiliations/pending");
            setPending(res.data);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const acceptRequest = async (id) => {
        try {
            let res = await instance.put(`/api/requests/affiliations/${id}`, {
                markAs: "ACCEPTED",
            });
            console.log(res.data.username, res.data.ststus);

            // res = await instance.delete(`/api/requests/affiliations/${id}`);
            // console.log(res.data.username, "Request status changed!");
        } catch (e) {
            console.log(e);
        }

        fetchRequests();
    };

    const deleteNGOs = async (username) => {
        try {
            let res = await instance.delete(
                `/api/requests/affiliations/${username}`
            );
            console.log(res.data.username, "Deleted!");
        } catch (e) {
            console.log(e);
        }

        fetchNGOs();
    };

    useEffect(() => {
        setToken(AsyncStorage.getItem("token"));

        fetchNGOs();

        fetchRequests();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Backdrop
                        revealed={revealed}
                        backLayerContainerStyle={{ backgroundColor: "#8e24aa" }}
                        subheaderContainerStyle={{ backgroundColor: "#8e24aa" }}
                        headerContainerStyle={{ backgroundColor: "#8e24aa" }}
                        header={
                            <AppBar
                                title="Dashboard"
                                color="#8e24aa"
                                leading={(props) => (
                                    <IconButton
                                        icon={(props) => (
                                            <Icon
                                                name={
                                                    revealed ? "close" : "menu"
                                                }
                                                {...props}
                                            />
                                        )}
                                        onPress={() =>
                                            setRevealed(
                                                (prevState) => !prevState
                                            )
                                        }
                                        {...props}
                                    />
                                )}
                            />
                        }
                        backLayer={
                            <View
                                style={{
                                    height: 80,
                                    marginBottom: -10,
                                    padding: 12,
                                    backgroundColor: "#8e24aa",
                                }}
                            >
                                <Flex
                                    center
                                    fill
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: "16px",
                                        }}
                                    >
                                        Show NGOs
                                    </Text>
                                    <Switch
                                        value={showNGO}
                                        onValueChange={() => {
                                            setShowNGO(!showNGO);
                                            fetchNGOs();
                                            fetchRequests();
                                        }}
                                    />
                                </Flex>
                            </View>
                        }
                    >
                        <BackdropSubheader
                            title={showNGO ? "NGOs" : "Affiliation Requests"}
                        />
                        {showNGO && (
                            <ScrollView>
                                <Flex>
                                    <Stack>
                                        {orgs?.map((org, index) => (
                                            <Box
                                                key={index}
                                                style={{
                                                    margin: 12,
                                                    backgroundColor: "#eee",
                                                    borderRadius: 8,
                                                    display: "flex",
                                                }}
                                            >
                                                <Flex justify="center">
                                                    <HStack spacing={8}>
                                                        <Box
                                                            style={{
                                                                backgroundColor:
                                                                    "#fb8c00",
                                                                borderBottomLeftRadius: 8,
                                                                borderTopLeftRadius: 8,
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Image
                                                                resizeMode="center"
                                                                source={require("../../assets/favicon.png")}
                                                            />
                                                        </Box>
                                                        <Flex direction="row">
                                                            <Stack
                                                                style={{
                                                                    width: "67%",
                                                                    flexGrow: 1,
                                                                    padding: 8,
                                                                }}
                                                            >
                                                                <Text>
                                                                    {org.name}
                                                                </Text>
                                                                <Text>
                                                                    {org.email}
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        org.phoneNum
                                                                    }
                                                                </Text>
                                                            </Stack>
                                                            <Box
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                <IconButton
                                                                    icon={(
                                                                        props
                                                                    ) => (
                                                                        <Icon
                                                                            name="delete-outline"
                                                                            {...props}
                                                                        />
                                                                    )}
                                                                    onPress={() => {
                                                                        deleteNGOs(
                                                                            org.username
                                                                        );
                                                                        fetchNGOs();
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Flex>
                                                    </HStack>
                                                </Flex>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Flex>
                            </ScrollView>
                        )}
                        {!showNGO && (
                            <ScrollView>
                                <Flex>
                                    <Stack>
                                        {pending?.map((org, index) => (
                                            <Box
                                                key={index}
                                                style={{
                                                    margin: 12,
                                                    backgroundColor: "#eee",
                                                    borderRadius: 8,
                                                    display: "flex",
                                                }}
                                            >
                                                <Flex justify="center">
                                                    <HStack spacing={8}>
                                                        <Box
                                                            style={{
                                                                backgroundColor:
                                                                    "#fb8c00",
                                                                borderBottomLeftRadius: 8,
                                                                borderTopLeftRadius: 8,
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Image
                                                                resizeMode="center"
                                                                source={require("../../assets/favicon.png")}
                                                            />
                                                        </Box>
                                                        <Flex direction="row">
                                                            <Stack
                                                                style={{
                                                                    width: "67%",
                                                                    flexGrow: 1,
                                                                    padding: 8,
                                                                }}
                                                            >
                                                                <Text>
                                                                    {org.name}
                                                                </Text>
                                                                <Text>
                                                                    {org.email}
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        org.phoneNum
                                                                    }
                                                                </Text>
                                                            </Stack>
                                                            <Box
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                <IconButton
                                                                    icon={(
                                                                        props
                                                                    ) => (
                                                                        <Icon
                                                                            name="check"
                                                                            {...props}
                                                                        />
                                                                    )}
                                                                    onPress={() => {
                                                                        acceptRequest(
                                                                            org.id
                                                                        );
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Flex>
                                                    </HStack>
                                                </Flex>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Flex>
                            </ScrollView>
                        )}
                    </Backdrop>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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

export default DashboardAdmin;
