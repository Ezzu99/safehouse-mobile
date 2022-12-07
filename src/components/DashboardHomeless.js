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
    TextInput,
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

const DashboardHomeless = () => {
    const [workshops, setWorkshops] = useState();
    const [jobs, setJobs] = useState();
    const [showWorkshop, setShowWorkshop] = useState(true);
    const [showJob, setShowJob] = useState(false);
    const [showAddJob, setAddJob] = useState(false);
    const [showAddWorkshop, setAddWorkshop] = useState(false);
    const [course, setCourse] = useState("");
    const [instructor, setInstructor] = useState("");
    const [courseUrl, setCourseUrl] = useState("");
    const [job, setJob] = useState("");
    const [employer, setEmployer] = useState("");
    const [jobUrl, setJobUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [revealed, setRevealed] = useState(false);
    const [token, setToken] = useState(AsyncStorage.getItem("token"));
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    let instance = axios.create({
        baseURL: "http://192.168.43.45:3000",
        timeout: 6000,
        headers: {
            post: {
                "Content-Type": "application/json",
            },
            Authorization: `Bearer ${token._z}`,
        },
    });

    const fetchWorkshops = async () => {
        try {
            let res = await instance.get("/api/courses");

            console.log(res.data);
            setWorkshops(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchJobs = async () => {
        try {
            let res = await instance.get("/api/jobs");

            console.log(res.data);
            setJobs(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setToken(AsyncStorage.getItem("token"));

        fetchWorkshops();
        fetchJobs();
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
                                    height: 70,
                                    marginBottom: -10,
                                    padding: 12,
                                    backgroundColor: "#8e24aa",
                                }}
                            >
                                <Stack spacing={12}>
                                    <HStack
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
                                            Show Workshops
                                        </Text>
                                        <Switch
                                            value={showWorkshop}
                                            onValueChange={() => {
                                                setShowWorkshop(!showWorkshop);
                                            }}
                                        />
                                    </HStack>
                                </Stack>
                            </View>
                        }
                    >
                        <BackdropSubheader
                            title={showWorkshop ? "Workshops" : "Jobs"}
                        />
                        {showWorkshop && (
                            <ScrollView>
                                <Flex>
                                    <Stack>
                                        {workshops?.map((workshop, index) => (
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
                                                                    {
                                                                        workshop.name
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        workshop.instructor
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        workshop.url
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        workshop.desc
                                                                    }
                                                                </Text>
                                                            </Stack>
                                                        </Flex>
                                                    </HStack>
                                                </Flex>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Flex>
                            </ScrollView>
                        )}
                        {!showWorkshop && (
                            <ScrollView>
                                <Flex>
                                    <Stack>
                                        {jobs?.map((jobx, index) => (
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
                                                                    {jobx.name}
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        jobx.employer
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {jobx.url}
                                                                </Text>
                                                                <Text>
                                                                    {jobx.desc}
                                                                </Text>
                                                            </Stack>
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
        fontSize: "42",
        fontFamily: "Poppins-Medium",
    },
});

export default DashboardHomeless;
