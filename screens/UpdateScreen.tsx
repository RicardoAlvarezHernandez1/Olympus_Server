import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { AdminContext } from "../context/AdminContext";
import {  updateUser } from "../services/OlympusServices";



// Define el tipo de las rutas
type RootStackParamList = {
  Update: { loadUsers: Function, navigation: NavigationProp<ParamListBase> };
};

const UpdateScreen = ({ route }: { route: RouteProp<RootStackParamList, "Update"> }) => {
  const { userId } = React.useContext(AdminContext);
  const { loadUsers, navigation } = route.params;


  const [user_Name, setUsername] = React.useState("");
  const [user_Mail, setUserMail] = React.useState("");
  const [user_Password, setUserPassword] = React.useState("");
  const [user_Height, setHeight] = React.useState(0);
  const [user_Weight, setWeight] = React.useState(0);

  const onClickUpdateButton = () => {
    const id = userId;
    const name = user_Name;
    const mail = user_Mail;
    const password = user_Password;
    const height = user_Height;
    const weight = user_Weight;

    {
      if (
        name == "" ||
        mail == "" ||
        password == "" ||
        height == null ||
        weight == null
      ) {
        window.alert("Por favor , rellene los campos necesarios");
      } else {
        updateUser(id, name, mail, password, height, weight)
          .then((status) => {
            if (status == 400) {
              window.alert("Error : no se a podido registrar el usuario");
              return null;
            } else {
              window.alert("Succesfully update");
              loadUsers()
              navigation.navigate("Admin")
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
          <Text style={styles.welcomeTitle}>Editing user</Text>
          <ScrollView>
            <Text style={styles.description}>Name</Text>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              placeholder="User Name..."
              style={styles.inputStyle}
            ></TextInput>
            <Text style={styles.description}>Mail</Text>
            <TextInput
              onChangeText={(text) => setUserMail(text)}
              placeholder="Email..."
              style={styles.inputStyle}
            ></TextInput>
            <Text style={styles.description}>Password</Text>
            <TextInput
              onChangeText={(text) => setUserPassword(text)}
              placeholder="Password..."
              style={styles.inputStyle}
              secureTextEntry={true}
            ></TextInput>
            <Text style={styles.description}>Weight</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setWeight(parseFloat(text))}
              placeholder="Weight..."
              style={styles.inputStyle}
            ></TextInput>
            <Text style={styles.description}>Height</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setHeight(parseFloat(text))}
              placeholder="Height..."
              style={styles.inputStyle}
            ></TextInput>
            <Pressable onPress={() => onClickUpdateButton()}>
              <Text>Hola</Text>
            </Pressable>
          </ScrollView>
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
