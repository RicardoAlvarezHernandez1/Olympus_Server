import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import {
  addAchievementToUser,
  deleteAchievementFromUser,
} from "../services/OlympusServices";
import { AdminContext } from "../context/AdminContext";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// AchievementsMade component definition
const AchievementsMade = ({
  id,
  achievementDescription,
  navigation,
}: {
  id: number;
  achievementDescription: string;
  navigation: NavigationProp<ParamListBase>;
}) => {
  // Getting userId from AdminContext
  const { userId } = React.useContext(AdminContext);

  // Function to handle deleting achievement from user
  const onClickDeleteAchievement = (id: number) => {
    // Check if id is valid
    if (id == null || id == 0) {
      // Alert if id is invalid
      window.alert("Please insert a valid achievement id");
    } else {
      // Deleting achievement from user
      deleteAchievementFromUser(userId, id)
        .then((response) => {
          // Handling response
          if (response != 200) {
            // Alert if there's an error
            window.alert("Error");
            return null;
          } else {
            // Alert success and navigate to Admin screen
            window.alert("Achievement deleted succesfully");
            navigation.navigate("Admin");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Return the UI for AchievementsMade component
  return (
    <>
      <View style={styles.achievementContainer}>
        <View style={styles.pressableContainer}>
          <Text style={styles.achievementDescriptionStyle}>
            {achievementDescription}
          </Text>
          <Pressable
            style={styles.pressables}
            onPress={() => onClickDeleteAchievement(id)}
          >
            <Ionicons name={"trash-outline"} size={30} color={"black"} />
          </Pressable>
        </View>
      </View>
    </>
  );
};

// Exporting the AchievementsMade component
export default AchievementsMade;

// Styles for the AchievementsMade component
const styles = StyleSheet.create({
  achievementContainer: {
    width: 300,
    height: 120,
    backgroundColor: AppColors.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 10,
  },
  pressables: {
    display: "flex",
    justifyContent: "center",
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
  },
  achievementDescriptionStyle: {
    fontSize: 20,
    textAlign: "center",
    width: 120,
  },
});
