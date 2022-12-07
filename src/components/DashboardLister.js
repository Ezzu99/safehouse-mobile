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

const DashboardLister = () => {
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
        timeout: 10000,
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

    const deleteCourse = async (id) => {
        try {
            let res = await instance.delete(`/api/courses/${id}`);

            console.log(res.data);
            fetchWorkshops();
        } catch (e) {
            console.log(e);
        }
    };

    const deleteJob = async (id) => {
        try {
            let res = await instance.delete(`/api/jobs/${id}`);

            console.log(res.data);
            fetchJobs();
        } catch (e) {
            console.log(e);
        }
    };

    const submitFormWorkshop = async () => {
        setLoading(true);

        try {
            let res = await instance.post("/api/courses", {
                name: course,
                desc,
                instructor,
                url: courseUrl,
                lister: AsyncStorage.getItem("username"),
            });

            console.log(res.data);
        } catch (e) {
            console.log(e);
        }

        setDesc("");
        setLoading(false);
    };

    const submitFormJob = async () => {
        setLoading(true);

        try {
            let res = await instance.post("/api/jobs", {
                name: job,
                desc,
                employer,
                url: jobUrl,
                lister: AsyncStorage.getItem("username"),
            });

            console.log(res.data);
        } catch (e) {
            console.log(e);
        }

        setDesc("");
        setLoading(false);
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
                                    height: 190,
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
                                                setShowWorkshop(true);
                                                setShowJob(false);
                                                setAddWorkshop(false);
                                                setAddJob(false);
                                                fetchWorkshops();
                                            }}
                                        />
                                    </HStack>
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
                                            Show Jobs
                                        </Text>
                                        <Switch
                                            value={showJob}
                                            onValueChange={() => {
                                                setShowWorkshop(false);
                                                setShowJob(true);
                                                setAddWorkshop(false);
                                                setAddJob(false);
                                                fetchJobs();
                                            }}
                                        />
                                    </HStack>
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
                                            Add Workshop
                                        </Text>
                                        <Switch
                                            value={showAddWorkshop}
                                            onValueChange={() => {
                                                setShowWorkshop(false);
                                                setShowJob(false);
                                                setAddWorkshop(true);
                                                setAddJob(false);
                                            }}
                                        />
                                    </HStack>
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
                                            Add Job
                                        </Text>
                                        <Switch
                                            value={showAddJob}
                                            onValueChange={() => {
                                                setShowWorkshop(false);
                                                setShowJob(false);
                                                setAddWorkshop(false);
                                                setAddJob(true);
                                            }}
                                        />
                                    </HStack>
                                </Stack>
                            </View>
                        }
                    >
                        <BackdropSubheader
                            title={
                                showWorkshop
                                    ? "Workshops"
                                    : showJob
                                    ? "Jobs"
                                    : showAddWorkshop
                                    ? "Add Workshop"
                                    : "Add Job"
                            }
                        />
                        {showWorkshop &&
                            !showJob &&
                            !showAddJob &&
                            !showAddWorkshop && (
                                <ScrollView>
                                    <Flex>
                                        <Stack>
                                            {workshops?.map(
                                                (workshop, index) => (
                                                    <Box
                                                        key={index}
                                                        style={{
                                                            margin: 12,
                                                            backgroundColor:
                                                                "#eee",
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
                                                                        display:
                                                                            "flex",
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
                                                                                deleteCourse(
                                                                                    workshop.id
                                                                                );
                                                                                fetchWorkshops();
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                </Flex>
                                                            </HStack>
                                                        </Flex>
                                                    </Box>
                                                )
                                            )}
                                        </Stack>
                                    </Flex>
                                </ScrollView>
                            )}
                        {!showWorkshop &&
                            showJob &&
                            !showAddJob &&
                            !showAddWorkshop && (
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
                                                                    display:
                                                                        "flex",
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
                                                                            jobx.name
                                                                        }
                                                                    </Text>
                                                                    <Text>
                                                                        {
                                                                            jobx.employer
                                                                        }
                                                                    </Text>
                                                                    <Text>
                                                                        {
                                                                            jobx.url
                                                                        }
                                                                    </Text>
                                                                    <Text>
                                                                        {
                                                                            jobx.desc
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
                                                                            deleteJob(
                                                                                jobx.id
                                                                            );
                                                                            fetchJobs();
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
                        {!showWorkshop &&
                            !showJob &&
                            !showAddJob &&
                            showAddWorkshop && (
                                <ScrollView>
                                    <Flex
                                        fill
                                        justifyContent="center"
                                        style={{
                                            padding: 18,
                                        }}
                                    >
                                        <Stack spacing={18}>
                                            <TextInput
                                                label="Course Name"
                                                textContentType="none"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setCourse}
                                                value={course}
                                            />
                                            <TextInput
                                                label="Instructor Name"
                                                textContentType="none"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setInstructor}
                                                value={instructor}
                                            />
                                            <TextInput
                                                label="Course URL"
                                                textContentType="URL"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setCourseUrl}
                                                value={courseUrl}
                                            />
                                            <TextInput
                                                label="Description"
                                                textContentType="none"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setDesc}
                                                value={desc}
                                            />
                                            <Button
                                                title="Add Course"
                                                variant="contained"
                                                color="#fb8c00"
                                                titleStyle={{ color: "#fff" }}
                                                onPress={submitFormWorkshop}
                                                disabled={loading}
                                                loading={loading}
                                            ></Button>
                                        </Stack>
                                    </Flex>
                                </ScrollView>
                            )}
                        {!showWorkshop &&
                            !showJob &&
                            showAddJob &&
                            !showAddWorkshop && (
                                <ScrollView>
                                    <Flex
                                        fill
                                        justifyContent="center"
                                        style={{
                                            padding: 18,
                                        }}
                                    >
                                        <Stack spacing={18}>
                                            <TextInput
                                                label="Job Name"
                                                textContentType="none"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setJob}
                                                value={job}
                                            />
                                            <TextInput
                                                label="Employer Name"
                                                textContentType="none"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setEmployer}
                                                value={employer}
                                            />
                                            <TextInput
                                                label="Job URL"
                                                textContentType="URL"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setJobUrl}
                                                value={jobUrl}
                                            />
                                            <TextInput
                                                label="Description"
                                                textContentType="none"
                                                variant="standard"
                                                color="#8e24aa"
                                                onChangeText={setDesc}
                                                value={desc}
                                            />
                                            <Button
                                                title="Add Job"
                                                variant="contained"
                                                color="#fb8c00"
                                                titleStyle={{ color: "#fff" }}
                                                onPress={submitFormJob}
                                                disabled={loading}
                                                loading={loading}
                                            ></Button>
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

export default DashboardLister;
