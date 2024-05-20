import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AdminContext } from "../context/AdminContext";
import { loginAdmin } from "../services/OlympusServices";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { OLYMPUS_SERVER_BACKGROUND_IMAGE } from "../constants/global.const";

type LoginScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { toggleIsLogged } = React.useContext(AdminContext);
  const [mail, setMail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onClickButton = () => {
    const userMail: string = mail;
    const userPassword: string = password;

    if (userMail.trim() == "" || userPassword.trim() == "") {
      window.alert("Please , fill in the required fields");
    } else {
      loginAdmin(userMail, userPassword)
        .then((response) => {
          if (!response.ok) {
            window.alert("Incorrect email or password");
            return null;
          }
          return response.json();
        })
        .then((data) => {
          if (data === true) {
            toggleIsLogged();
            navigation.navigate("Admin");
          } else {
            window.alert("Incorrect email or password");
          }
        })
        .catch((error) => {
          console.error("Request error : ", error);
          window.alert("Unregistered Administrator");
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_SERVER_BACKGROUND_IMAGE}
        style={styles.imagebackground}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Log In</Text>
          <Text style={styles.description}>
            Oh you already have an account?
          </Text>
          <Text style={styles.description}>You can log in here</Text>
          <TextInput
            onChangeText={(text) => setMail(text)}
            placeholder="Your email..."
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            placeholder="Password..."
            style={styles.inputStyle}
            secureTextEntry={true}
          ></TextInput>
          <TouchableOpacity
            style={styles.Pressable}
            onPress={() => onClickButton()}
          >
            <Text style={styles.buttonContent}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginTitle: {
    fontWeight: "700",
    fontSize: 35,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
  },
  imagebackground: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loginContainer: {
    width: 300,
    height: 400,
    backgroundColor: AppColors.lightGreen,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
  },
  buttonContent: {
    color: "black",
    fontWeight: "700",
  },
  Pressable: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.darkGreen,
  },
  inputStyle: {
    width: 250,
    height: 50,
    backgroundColor: AppColors.limeGreen,
    borderRadius: 10,
    marginTop: 20,
  },
  boxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 16,
  },
});
