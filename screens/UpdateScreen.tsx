import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
  } from "react-native";
  import React from "react";
  import AppColors from "../assets/styles/appColors";
  import {
    NavigationContainer,
    NavigationProp,
    ParamListBase,
  } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { AdminContext } from "../context/AdminContext";
  import { registerAdmin } from "../services/OlympusServices";
  import { Ionicons } from "@expo/vector-icons";
  
  type WelcomeScreenProps = {
    navigation: NavigationProp<ParamListBase>;
  };
  const UpdateScreen = ({ navigation }: WelcomeScreenProps) => {
    const { admin, setAdminName } = React.useContext(AdminContext);
    const [adminEmail, setadminEmail] = React.useState("");
    const [adminPassword, setadminPassword] = React.useState("");
  
    function setAdmin(text: string) {
      setAdminName(text);
    }
    function setEmail(text: string) {
      setadminEmail(text);
    }
    function setPassword(text: string) {
      setadminPassword(text);
    }
  
    const onClickButton = (
      adminName: string,
      adminEmail: string,
      adminPassword: string
    ) => {
      {
        if (adminName == "" || adminEmail == "" || adminPassword == "") {
          window.alert("Por favor , rellene los campos necesarios");
        } else {
          registerAdmin(adminName, adminEmail, adminPassword)
            .then((status) => {
              if (status == 400) {
                window.alert("Error : no se a podido registrar el usuario");
                return null;
              } else {
                window.alert("Registro exitoso");
              }
            })
            .catch((err) => console.log(err));
        }
      }
    };
  
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("./../assets/images/Fondo_Olympus_Server.png")}
          style={styles.image}
        >
          <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
            <Text style={styles.welcomeTitle}>
              ¡ WELCOME TO OLYMPUS-APP FOR ADMINS !
            </Text>
            <Text style={styles.description}>Don't have an account?</Text>
            <Text style={styles.description}>You can register here</Text>
            <TextInput
              onChangeText={(text) => setAdmin(text)}
              placeholder="Admin Name..."
              style={styles.inputStyle}
            ></TextInput>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              placeholder="Email..."
              style={styles.inputStyle}
            ></TextInput>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              placeholder="Password..."
              style={styles.inputStyle}
              secureTextEntry={true}
            ></TextInput>
            <TouchableOpacity
              style={{ ...styles.touchable, ...styles.boxShadow }}
              onPress={() =>
                onClickButton(`${admin}`, `${adminEmail}`, `${adminPassword}`)
              }
            >
              <Text style={styles.buttonContent}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.login, ...styles.boxShadow }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonContent}>JUST LOGIN</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default UpdateScreen;
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    welcomeTitle: {
      fontWeight: "700",
      fontSize: 35,
      textAlign: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    description: {
      fontSize: 20,
      fontWeight: "400",
      textAlign: "center",
      marginTop: 10,
    },
    inputStyle: {
      width: 250,
      height: 50,
      backgroundColor: AppColors.limeGreen,
      borderRadius: 10,
      marginTop: 20,
    },
    welcomeContainer: {
      width: 300,
      height: 600,
      alignItems: "center",
      backgroundColor: AppColors.greenishWhite,
      borderRadius: 30,
    },
    buttonContent: {
      color: "black",
      fontWeight: "700",
    },
    touchable: {
      marginTop: 30,
      marginBottom: 15,
      borderColor: "white",
      borderWidth: 2,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: AppColors.darkGreen,
    },
    login: {
      marginTop: 10,
      marginBottom: 15,
      borderColor: "white",
      borderWidth: 2,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: AppColors.green,
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
  