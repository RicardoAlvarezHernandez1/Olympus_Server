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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AdminContext } from "../context/AdminContext";
import { registerAdmin } from "../services/OlympusServices";
import { Ionicons } from "@expo/vector-icons";
import User from "../components/User";
import { getUsers } from "../services/OlympusServices";
import { UserInterface } from "../assets/interfaces/UserInterface";

type AdminsCreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const AdminScreen = ({ navigation }: AdminsCreenProps) => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);

  React.useEffect(() => {
    const loadUsers = async () => {
      const recievedUsers = await getUsers();
      if (recievedUsers != null) {
        setUsers(recievedUsers);
      }
    };
    loadUsers();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("./../assets/images/Fondo_Olympus_Server.png")}
        style={styles.image}
      >
        <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
          <Text style={styles.tittle}>Members List</Text>
          <ScrollView style={styles.scrollviewStyle}>
            {users.map((user) => (
              <User
                key={user.userId}
                id={user.userId}
                name={user.userName}
                password={user.userPassword}
                mail={user.userMail}
                height={user.userHeight}
                weight={user.userWeight}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdminScreen;

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
  tittle: {
    fontWeight: "700",
    fontSize: 35,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeContainer: {
    width: 350,
    height: 470,
    alignItems: "center",
    backgroundColor: AppColors.lightGreen,
    borderRadius: 30,
  },
  scrollviewStyle: {
    height: 50,
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
