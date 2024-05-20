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

const AchievementsMade = ({
  id,
  achievementDescription,
  navigation,
}: {
  id: number;
  achievementDescription: string;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { userId } = React.useContext(AdminContext);

  const onClickDeleteAchievement = (id: number) => {
    if (id == null || id == 0) {
      window.alert("Please insert a valid achievement id");
    } else {
      deleteAchievementFromUser(userId, id)
        .then((response) => {
          if (response != 200) {
            window.alert("Error");
            return null;
          } else {
            window.alert("Achievement deleted succesfully");
            navigation.navigate("Admin");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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

export default AchievementsMade;

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
