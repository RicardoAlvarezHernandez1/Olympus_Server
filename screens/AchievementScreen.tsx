import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
 
  } from "react-native";
  import React from "react";
  import AppColors from "../assets/styles/appColors";
  import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
  import { AdminContext } from "../context/AdminContext";
  import { addAchievementToUser } from "../services/OlympusServices";
  import { NavigationProp, ParamListBase } from "@react-navigation/native";
  
  type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>;
  };
  const AchievementScreen = ({ navigation}: LoginScreenProps ) => {
    const { userId } = React.useContext(AdminContext);
    const [achievementId, setAchievementId] = React.useState(0)
  
    const onClickButton = (id: number) => {
      if (id == null || id == 0) {
        window.alert("Please inser a valid achievement id");
      } else {
        addAchievementToUser(userId, id)
          .then((response) => {
            if (response != 200) {
              window.alert("Error");
              return null;
            } else {
              window.alert("Achievement gived succesfully")
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
  
   
  
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("./../assets/images/Fondo_Olympus_Server.png")}
          style={styles.imagebackground}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Assign achievement to a user</Text>
            <Text>Insert achievement number</Text>
            <TextInput
              onChangeText={(text) => setAchievementId(parseInt(text))}
              placeholder="Password..."
              style={styles.inputStyle}
              keyboardType="numeric"
            ></TextInput>
            <TouchableOpacity
              style={styles.Pressable}
              onPress={() => onClickButton(achievementId)}
            >
              <Text style={styles.buttonContent}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default AchievementScreen;
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 150,
      height: 150,
    },
    welcomeTitle: {
      fontWeight: "700",
      fontSize: 35,
      textAlign: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    description: {
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center",
      marginTop: 20,
    },
    imagebackground: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    welcomeContainer: {
      width: 300,
      height: 400,
      backgroundColor: AppColors.lightGreen,
      justifyContent: "center",
      alignItems: "center",
  
      borderRadius: 20,
    },
    buttonContent: {
      color: "black",
      fontWeight: "700",
    },
    icon: {
      marginRight: 5,
    },
    Pressable: {
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 15,
      borderColor: "white",
      borderWidth: 2,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: AppColors.darkGreen,
    },
    inputStyle: {
      width: 250,
      height: 50,
      backgroundColor: AppColors.limeGreen,
      borderRadius: 10,
      marginTop: 20,
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
  