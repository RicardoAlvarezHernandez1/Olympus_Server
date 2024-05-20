import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useCallback } from "react";
import AppColors from "../assets/styles/appColors";
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import User from "../components/User";
import { getUsers } from "../services/OlympusServices";
import { UserInterface } from "../assets/interfaces/UserInterface";
import { OLYMPUS_SERVER_BACKGROUND_IMAGE } from "../constants/global.const";

type AdminsCreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const AdminScreen = ({ navigation }: AdminsCreenProps) => {
  const [users, setUsers] = React.useState<UserInterface[]>([]);
  const [isEmpty, setIsEmpty] = React.useState(false);

  const checkIfUserListIsEmpty = () => {
    if (users.length == 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const loadUsers = async () => {
    const recievedUsers = await getUsers();
    if (recievedUsers != null) {
      setUsers(recievedUsers);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers();
      checkIfUserListIsEmpty();
    }, [])
  );

  React.useEffect(() => {
    loadUsers();
    checkIfUserListIsEmpty();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_SERVER_BACKGROUND_IMAGE}
        style={styles.imageBackground}
      >
        {isEmpty ? (
          <View style={{ ...styles.boxShadow, ...styles.adminContainer }}>
            <Text style={styles.title}>Users List</Text>
            <ScrollView style={styles.scrollviewStyle}>
              {users.map((user) => (
                <User
                  key={user.userId}
                  id={user.userId}
                  name={user.userName}
                  loadUsers={loadUsers}
                  navigation={navigation}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={{ ...styles.boxShadow, ...styles.noUsersContainer }}>
            <Text style={styles.title}>Users List</Text>
            <View>
              <Text style={styles.noUsersMessage}>
                There are no users yet...
              </Text>
            </View>
          </View>
        )}
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
  imageBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "700",
    fontSize: 35,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  adminContainer: {
    width: 350,
    height: 470,
    alignItems: "center",
    backgroundColor: AppColors.lightGreen,
    borderRadius: 30,
  },
  noUsersContainer: {
    width: 350,
    height: 200,
    alignItems: "center",
    backgroundColor: AppColors.lightGreen,
    borderRadius: 30,
  },
  scrollviewStyle: {
    height: 50,
  },
  noUsersMessage: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
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
