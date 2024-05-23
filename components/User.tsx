import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { deleteUser } from "../services/OlympusServices";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { AdminContext } from "../context/AdminContext";

// User component definition
const User = ({
  navigation,
  id,
  name,
  loadUsers,
}: {
  navigation: NavigationProp<ParamListBase>;
  id: number;
  name: string;
  loadUsers: Function;
}) => {
  // Getting setId function from AdminContext
  const { setId } = React.useContext(AdminContext);

  // Function to handle user deletion
  /**
   * 
   * @param userId - id of the user to delete
   * @param userName - name of the user to delete
   */
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
                    // Alert success and reload users
                    window.alert("User deleted succesfully");
                    loadUsers();
                  } else {
                    // Alert if there's an error
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

  // Function to handle user update
  const onClickUpdate = () => {
    setId(id);
    navigation.navigate("Update", { navigation, loadUsers });
  };

  // Function to handle achievements for the user
  const onClickAchievement = () => {
    setId(id);
    navigation.navigate("Achievements");
  };

  // Return the UI for User component
  return (
    <>
      <View style={styles.userContainer}>
        <View style={styles.userTitleContainer}>
          <Ionicons name={"person-circle-outline"} size={50} color={"black"} />
          <Text style={styles.userNameStyle}>{name}</Text>
        </View>

        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressables}
            onPress={() => onClickDelete(id, name)}
          >
            <Ionicons name={"trash-outline"} size={30} color={"black"} />
          </Pressable>
          <Pressable style={styles.pressables} onPress={() => onClickUpdate()}>
            <Ionicons name={"pencil-outline"} size={30} color={"black"} />
          </Pressable>
          <Pressable
            style={styles.pressables}
            onPress={() => onClickAchievement()}
          >
            <Ionicons name={"trophy"} size={30} color={"black"} />
          </Pressable>
        </View>
      </View>
    </>
  );
};

// Exporting the User component
export default User;

// Styles for the User component
const styles = StyleSheet.create({
  userContainer: {
    width: 300,
    height: 160,
    backgroundColor: AppColors.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 10,
  },
  userTitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  pressables: {
    marginHorizontal: 20,
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
  },
  userNameStyle: {
    fontSize: 20,
    marginTop: 12,
    marginLeft: 5,
  },
});
