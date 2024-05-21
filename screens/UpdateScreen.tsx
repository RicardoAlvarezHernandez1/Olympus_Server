import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import AppColors from "../assets/styles/appColors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { AdminContext } from "../context/AdminContext";
import { updateUser } from "../services/OlympusServices";
import { OLYMPUS_SERVER_BACKGROUND_IMAGE } from "../constants/global.const";
import appColors from "../assets/styles/appColors";

// Defining navigation route types
type RootStackParamList = {
  Update: { loadUsers: Function; navigation: any };
};
type UpdateScreenRouteProp = RouteProp<RootStackParamList, "Update">;

// Definition of the UpdateScreen component
const UpdateScreen = () => {
  // Using the route to get necessary parameters
  const route = useRoute<UpdateScreenRouteProp>();
  const { userId } = React.useContext(AdminContext);
  const { loadUsers, navigation } = route.params;

  // Defining states for user data
  const [user_Name, setUsername] = React.useState("");
  const [user_Mail, setUserMail] = React.useState("");
  const [user_Password, setUserPassword] = React.useState("");
  const [user_Height, setHeight] = React.useState(0);
  const [user_Weight, setWeight] = React.useState(0);

  // Function to handle click event on update button
  const onClickUpdateButton = () => {
    // Getting user data from states
    const id = userId;
    const name = user_Name;
    const mail = user_Mail;
    const password = user_Password;
    const height = user_Height;
    const weight = user_Weight;

    {
      // Validation of input fields
      if (
        name == "" ||
        mail == "" ||
        password == "" ||
        height == null ||
        weight == null
      ) {
        window.alert("Please , fill in the required fields");
      } else {
        // Calling function to update user
        updateUser(id, name, mail, password, height, weight)
          .then((status) => {
            if (status == 400) {
              window.alert("Error : failed to update the user");
              return null;
            } else {
              window.alert("Succesfully update");
              loadUsers();
              navigation.navigate("Admin");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  // Return the UI for Update Screen component
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={OLYMPUS_SERVER_BACKGROUND_IMAGE}
        style={styles.imageBackground}
      >
        <View style={{ ...styles.boxShadow, ...styles.updateContainer }}>
          <Text style={styles.updateTitle}>Editing user</Text>
          <ScrollView>
            <Text style={styles.description}>Name</Text>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              placeholder="User Name..."
              style={styles.inputStyle}
            ></TextInput>
            <Text style={styles.description}>Mail</Text>
            <TextInput
              onChangeText={(text) => setUserMail(text)}
              placeholder="Email..."
              style={styles.inputStyle}
            ></TextInput>
            <Text style={styles.description}>Password</Text>
            <TextInput
              onChangeText={(text) => setUserPassword(text)}
              placeholder="Password..."
              style={styles.inputStyle}
              secureTextEntry={true}
            ></TextInput>
            <Text style={styles.description}>Weight</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setWeight(parseFloat(text))}
              placeholder="Weight..."
              style={styles.inputStyle}
            ></TextInput>
            <Text style={styles.description}>Height</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setHeight(parseFloat(text))}
              placeholder="Height..."
              style={styles.inputStyle}
            ></TextInput>
            <Pressable
              style={styles.touchable}
              onPress={() => onClickUpdateButton()}
            >
              <Text style={styles.buttonContent}>Update</Text>
            </Pressable>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

// Export the Update Screen component
export default UpdateScreen;

// Styles for the Update Screen component
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
  updateTitle: {
    fontWeight: "700",
    fontSize: 35,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 10,
  },
  inputStyle: {
    width: 250,
    height: 50,
    backgroundColor: AppColors.limeGreen,
    borderRadius: 10,
    marginTop: 20,
  },
  updateContainer: {
    width: 300,
    height: 650,
    alignItems: "center",
    backgroundColor: AppColors.greenishWhite,
    borderRadius: 30,
  },
  buttonContent: {
    color: appColors.white,
    fontWeight: "700",
  },
  touchable: {
    flexDirection: "row",
    width: 95,
    marginTop: 30,
    marginBottom: 15,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.darkGreen,
    textAlign: "center",
    marginLeft: 75,
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
