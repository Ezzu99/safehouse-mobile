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

const DashboardNGO = () => {
    const [users, setUsers] = useState();
    const [revealed, setRevealed] = useState(false);
    const [token, setToken] = useState(AsyncStorage.getItem("token"));
    const [showUsers, setShowUsers] = useState(true);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

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

    const submitForm = async () => {
        setLoading(true);

        try {
            let res = await instance.post("/api/signup/ngo", {
                username,
                password,
                firstname: fname,
                lastname: lname,
                email,
                gender: gender.toUpperCase(),
                profileImage: "",
                phoneNum: phone,
                address,
                dateOfBirth: dob,
                role,
                orgUsername: AsyncStorage.getItem("username"),
            });

            console.log(res.data);
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    const fetchUsers = async () => {
        try {
            let res = await instance.get("/api/users");

            setUsers(res.data);
            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteUsers = async (uname) => {
        try {
            let res = await instance.delete(`/api/users/user/${uname}`);

            console.log(res.data);
        } catch (e) {
            console.log(e);
        }

        fetchUsers();
    };

    useEffect(() => {
        setToken(AsyncStorage.getItem("token"));

        fetchUsers();
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
                                        Show Users
                                    </Text>
                                    <Switch
                                        value={showUsers}
                                        onValueChange={() => {
                                            setShowUsers(!showUsers);
                                            fetchUsers();
                                        }}
                                    />
                                </Flex>
                            </View>
                        }
                    >
                        <BackdropSubheader
                            title={showUsers ? "Users" : "Add User"}
                        />
                        {showUsers && (
                            <ScrollView>
                                <Flex>
                                    <Stack>
                                        {users?.map((user, index) => (
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
                                                                        user.firstname
                                                                    }{" "}
                                                                    {
                                                                        user.lastname
                                                                    }
                                                                </Text>
                                                                <Text>
                                                                    {user.email}
                                                                </Text>
                                                                <Text>
                                                                    {
                                                                        user.phoneNum
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
                                                                        deleteUsers(
                                                                            user.username
                                                                        );
                                                                        fetchUsers();
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
                        {!showUsers && (
                            <ScrollView>
                                <Flex
                                    fill
                                    justifyContent="center"
                                    style={{ paddingHorizontal: 18 }}
                                >
                                    <Stack spacing={18}>
                                        <TextInput
                                            label="First Name"
                                            textContentType="name"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setFname}
                                            value={fname}
                                        />
                                        <TextInput
                                            label="Last Name"
                                            textContentType="nameSuffix"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setLname}
                                            value={lname}
                                        />
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
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setPassword}
                                            value={password}
                                        />
                                        <TextInput
                                            label="Email"
                                            textContentType="emailAddress"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setEmail}
                                            value={email}
                                        />
                                        <TextInput
                                            label="Phone"
                                            textContentType="telephoneNumber"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setPhone}
                                            value={phone}
                                        />
                                        <TextInput
                                            label="Address"
                                            textContentType="addressCityAndState"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setAddress}
                                            value={address}
                                        />
                                        <TextInput
                                            label="Gender"
                                            textContentType="none"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setGender}
                                            value={gender}
                                        />
                                        <TextInput
                                            label="Date of Birth"
                                            textContentType="oneTimeCode"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setDob}
                                            value={dob}
                                            placeholder="YYYY-MM-DD"
                                        />
                                        <TextInput
                                            label="Role"
                                            textContentType="none"
                                            variant="standard"
                                            color="#8e24aa"
                                            onChangeText={setRole}
                                            value={role}
                                            placeholder="user or lister"
                                        />
                                        <Button
                                            title="Register"
                                            variant="contained"
                                            color="#fb8c00"
                                            titleStyle={{ color: "#fff" }}
                                            onPress={submitForm}
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
        fontSize: "42px",
        fontFamily: "Poppins-Medium",
    },
});

export default DashboardNGO;
