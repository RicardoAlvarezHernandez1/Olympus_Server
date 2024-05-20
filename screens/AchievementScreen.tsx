import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { ScrollView } from "react-native-gesture-handler";
import { getAllAchievementsList } from "../services/OlympusServices";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { OLYMPUS_SERVER_BACKGROUND_IMAGE } from "../constants/global.const";
import { AchievementInterface } from "../assets/interfaces/AchievementInterface";
import Achievement from "../components/Achievement";

type LoginScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const AchievementScreen = ({ navigation }: LoginScreenProps) => {
  const [achievements, setAchievements] = React.useState<
    AchievementInterface[]
  >([]);

  const loadAchievements = async () => {
    const recievedAchievements = await getAllAchievementsList();
    if (recievedAchievements != null) {
      setAchievements(recievedAchievements);
    }
  };

  React.useEffect(() => {
    loadAchievements();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_SERVER_BACKGROUND_IMAGE}
        style={styles.imagebackground}
      >
        <View style={{ ...styles.boxShadow, ...styles.achievementsContainer }}>
          <Text style={styles.title}>Assign an achievement to the user</Text>
          <ScrollView style={styles.scrollviewStyle}>
            {achievements.map((achievement) => (
              <Achievement
                key={achievement.achievementId}
                id={achievement.achievementId}
                achievementDescription={achievement.achievementDescription}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 35,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imagebackground: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  achievementsContainer: {
    width: 350,
    height: 590,
    backgroundColor: AppColors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  scrollviewStyle: {
    height: 50,
    marginTop: 14,
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
