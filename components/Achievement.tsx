import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { addAchievementToUser } from "../services/OlympusServices";
import { AdminContext } from "../context/AdminContext";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

// Achievement component definition
const Achievement = ({
  id,
  achievementDescription,
  navigation,
  loadCurrentAchievements,
}: {
  id: number;
  achievementDescription: string;
  navigation: NavigationProp<ParamListBase>;
  loadCurrentAchievements: Function;
}) => {
  // Getting userId from AdminContext
  const { userId } = React.useContext(AdminContext);

  // Function to handle setting achievement to user
  const onClickSetAchievement = (id: number) => {
    // Check if id is valid
    if (id == null || id == 0) {
      window.alert("Please insert a valid achievement id");
    } else {
      // Adding achievement to user
      addAchievementToUser(userId, id)
        .then((response) => {
          // Handling response
          if (response != 200) {
            // Alert if there's an error
            window.alert("Error");
            return null;
          } else {
            {
              // Alert success and reload achievements
              Alert.alert(`Succesfull`, `Achievement gived successfully`, [
                {
                  text: "Confirm",
                  onPress: () => {
                    loadCurrentAchievements();
                  },
                },
              ]);
            }
            // Navigate to Admin screen
            navigation.navigate("Admin");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Return the UI for Achievement component
  return (
    <>
      <View style={styles.achievementContainer}>
        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressables}
            onPress={() => onClickSetAchievement(id)}
          >
            <Text style={styles.achievementDescriptionStyle}>
              {achievementDescription}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

// Exporting the Achievement component
export default Achievement;

// Styles for the Achievement component
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
    marginLeft: 20,
  },
  pressables: {
    marginHorizontal: 20,
    display: "flex",
    justifyContent: "center",
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 200,
  },
  achievementDescriptionStyle: {
    fontSize: 20,
    textAlign: "center",
  },
});
