import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useCallback } from "react";
import AppColors from "../assets/styles/appColors";
import { ScrollView } from "react-native-gesture-handler";
import {
  getAllAchievementsFromUser,
  getAllAchievementsList,
} from "../services/OlympusServices";
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { OLYMPUS_SERVER_BACKGROUND_IMAGE } from "../constants/global.const";
import { AchievementInterface } from "../assets/interfaces/AchievementInterface";
import Achievement from "../components/Achievement";
import { AdminContext } from "../context/AdminContext";
import AchievementsMade from "../components/AchievementsMade";

type LoginScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};
const AchievementScreen = ({ navigation }: LoginScreenProps) => {
  const [achievements, setAchievements] = React.useState<
    AchievementInterface[]
  >([]);

  const [currentAchievements, setCurrentAchievements] = React.useState<
    AchievementInterface[]
  >([]);

  const { userId } = React.useContext(AdminContext);
  const [isEmpty, setIsEmpty] = React.useState(false);

  const loadCurrentAchievements = async () => {
    const recievedAchievements = await getAllAchievementsFromUser(userId);
    if (recievedAchievements != null) {
      setCurrentAchievements(recievedAchievements);
    }
  };

  const loadAchievements = async () => {
    const recievedAchievements = await getAllAchievementsList();
    if (recievedAchievements != null) {
      setAchievements(recievedAchievements);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await loadAchievements();
        await loadCurrentAchievements();
      };
      fetchData();
    }, [])
  );

  React.useEffect(() => {
    const fetchData = async () => {
      await loadAchievements();
      await loadCurrentAchievements();
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const checkIfUserDontHaveAchievements = () => {
      if (currentAchievements.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    };
    checkIfUserDontHaveAchievements();
  }, [currentAchievements]);
  return (
  
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_SERVER_BACKGROUND_IMAGE}
        style={styles.imagebackground}
      >
        <View style={{ ...styles.boxShadow, ...styles.achievementsContainer }}>
          <ScrollView style={styles.scrollviewStyle}>
            <Text style={styles.title}>Current user achievements</Text>
              {isEmpty == false ? (
                currentAchievements.map((currentAchievement) => (            
                <View  style={styles.currentAchievementsContainer}>
                  <AchievementsMade
                    
                    id={currentAchievement.achievementId}
                    achievementDescription={
                      currentAchievement.achievementDescription
                    }
                    navigation={navigation}
                  />
                </View>
                ))
              ) : (
                <Text style={styles.description}>No current achievements</Text>
              )}
            <Text style={styles.title}>Assign an achievement to the user</Text>
            {achievements.map((achievement) => (
              <Achievement
                key={achievement.achievementId}
                id={achievement.achievementId}
                achievementDescription={achievement.achievementDescription}
                navigation={navigation}
                loadCurrentAchievements={loadCurrentAchievements}
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
    fontSize: 25,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 20,
    marginTop: 20,
    alignSelf: "center"

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  currentAchievementsContainer:{
    justifyContent: "center",
    alignItems: "center",
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
