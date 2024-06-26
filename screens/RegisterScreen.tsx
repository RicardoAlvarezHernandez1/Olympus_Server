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
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AdminContext } from "../context/AdminContext";
import { registerAdmin } from "../services/OlympusServices";
import {
  OLYMPUS_SERVER_BACKGROUND_IMAGE,
  validateEmail,
} from "../constants/global.const";

type RegisterScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
// RegisterScreen component definition
const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  // Admin name and set admin name using admin context
  const { admin, setAdminName } = React.useContext(AdminContext);
  // Admin mail state
  const [adminEmail, setadminEmail] = React.useState("");
  // Admin password state
  const [adminPassword, setadminPassword] = React.useState("");

  /**
   * 
   * @param text 
   */
  function setAdmin(text: string) {
    setAdminName(text);
  }

  /**
   * 
   * @param text 
   */
  function setEmail(text: string) {
    setadminEmail(text);
  }

  /**
   * 
   * @param text 
   */
  function setPassword(text: string) {
    setadminPassword(text);
  }

  // Function to handle button click
  /**
   * 
   * @param adminName 
   * @param adminEmail 
   * @param adminPassword 
   */
  const onClickButton = (
    adminName: string,
    adminEmail: string,
    adminPassword: string
  ) => {
    {
      // Check if required fills are not empty
      if (adminName == "" || adminEmail == "" || adminPassword == "") {
        window.alert("Please , fill in the required fields");
        // Check that the email is in a good format
      } else if (validateEmail(adminEmail)) {
        // Call function for register admin
        registerAdmin(adminName, adminEmail, adminPassword)
          .then((status) => {
            if (status == 400) {
              // Alert for error
              window.alert("Error : user could not be registered");
              return null;
            } else {
              // Alert if the registration was successfuly
              window.alert("Successful registration");
            }
          })
          .catch((err) => console.log(err));
      } else {
        window.alert("Please enter a valid email address");
      }
    }
  };

  // Return the UI for RegisterScreen component
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_SERVER_BACKGROUND_IMAGE}
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

// Export the RegisterScreen component
export default RegisterScreen;

// Styles for the RegisterScreen component
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
