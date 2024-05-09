import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppColors from "../assets/styles/appColors";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AdminContext } from "../context/AdminContext";
import { loginAdmin } from "../services/OlympusServices";

const LoginScreen = () => {
  const { isLogged, toggleIsLogged } = React.useContext(AdminContext);
  const { admin, setAdminName } = React.useContext(AdminContext);
  const [password, setPassword] = React.useState("");

  const onClickButton = (adminName: string, adminPassword: string) => {
    if (adminName.trim() == "" || adminPassword.trim() == "") {
      window.alert("Por favor , rellene los campos necesarios");
    } else {
      loginAdmin(adminName)
        .then((response) => {
          if (!response.ok) {
            window.alert("El usuario o la contraseña son incorrectos");
            return null;
          }
          return response.json();
        })
        .then((data) => {
          if (!data) {
            return;
          }
          const password = data.adminPassword;
          if (adminPassword === password) {
            toggleIsLogged();
          } else {
            window.alert("El usuario o la contraseña son incorrectos");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud: ", error);
          window.alert("Administrador no registrado");
        });
    }
  };

  const setadmin = (text: string) => {
    setAdminName(text);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Server.png")}
        style={styles.imagebackground}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Log In</Text>
          <Text style={styles.description}>
            Oh you already have an account?
          </Text>
          <Text style={styles.description}>You can log in here</Text>
          <TextInput
            onChangeText={(text) => setAdminName(text)}
            placeholder="Admin Name..."
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
            onPress={() => onClickButton(admin, password)}
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
  image: {
    width: 150,
    height: 150,
  },
  welcomeTitle: {
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
  welcomeContainer: {
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
  icon: {
    marginRight: 5,
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
