import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { addAchievementToUser } from "../services/OlympusServices";
import { AdminContext } from "../context/AdminContext";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

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
  const { userId } = React.useContext(AdminContext);

  const onClickSetAchievement = (id: number) => {
    if (id == null || id == 0) {
      window.alert("Please insert a valid achievement id");
    } else {
      addAchievementToUser(userId, id)
        .then((response) => {
          if (response != 200) {
            window.alert("Error");
            return null;
          } else {
            {
              Alert.alert(
                `Succesfull`,
                `Achievement gived successfully`,
                [
                  {
                    text: "Confirm",
                    onPress: () => {
                      loadCurrentAchievements()
                    }       
                  },
                ]
              );
            }
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

export default Achievement;

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
