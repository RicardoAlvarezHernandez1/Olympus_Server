import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { deleteUser } from "../services/OlympusServices";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AdminContext } from "../context/AdminContext";

type UserCreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const User = ({
  navigation,
  id,
  name,
  password,
  mail,
  height,
  weight,
  loadUsers
}: {
  navigation: NavigationProp<ParamListBase>;
  id: number;
  name: string;
  password: string;
  mail: string;
  height: number;
  weight: number;
  loadUsers: Function;
}) => {
  const { setId } = React.useContext(AdminContext);

  const onClickDelete = (userId: number, userName: string) => {
    {
      Alert.alert(
        `Delete`,
        `Are you sure you want to delete the user ${name}?`,
        [
          {
            text: "Confirm",
            onPress: () =>
              deleteUser(userId)
                .then((status) => {
                  if (status == 200) {
                    window.alert("User deleted succesfully");
                    loadUsers()
                  } else {
                    window.alert(
                      `Error while trying to delete the user ${userName}`
                    );
                  }
                })
                .catch((err) => console.log(err)),
          },
          {
            text: "Cancel",
            onPress: () => window.alert("Deleted Cancelled"),
          },
        ]
      );
    }
  };

  const onClickUpdate = () => {
    setId(id);
    navigation.navigate("Update", {navigation, loadUsers});
  };

  return (
    <>
      <View style={styles.userContainer}>
        <Ionicons name={"person-circle-outline"} size={50} color={"black"} />
        <Text style={styles.userNameStyle}>{name}</Text>
        <View style={styles.pressableContainer}>
          <Pressable onPress={() => onClickDelete(id, name)}>
            <Ionicons name={"trash-outline"} size={30} color={"black"} />
          </Pressable>
          <Pressable onPress={() => onClickUpdate()}>
            <Ionicons name={"pencil-outline"} size={30} color={"black"} />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default User;

const styles = StyleSheet.create({
  userContainer: {
    width: 300,
    height: 80,
    backgroundColor: AppColors.white,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 10,
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 100,
  },
  userNameStyle: {
    fontSize: 20,
  },
});
