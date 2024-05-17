import {
    StyleSheet,
    Text,
    View,
    ImageBackground,    
  } from "react-native";
  import React, { useCallback } from "react";
  import { useFocusEffect } from "@react-navigation/native";
  import AppColors from "../assets/styles/appColors";
  import {
    NavigationProp,
    ParamListBase,
  } from "@react-navigation/native";
  import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
  import { getUsers } from "../services/OlympusServices";
  import { UserInterface } from "../assets/interfaces/UserInterface";
import { UserContext } from "../context/UserContext";
  
  type AdminsCreenProps = {
    navigation: NavigationProp<ParamListBase>;
  };
  const ListUserScreen = ({ navigation }: AdminsCreenProps) => {
    const [users, setUsers] = React.useState<UserInterface[]>([]);
    const {userId, setId} = React.useContext(UserContext)
    const loadUsers = async () => {
      const recievedUsers = await getUsers();
      if (recievedUsers != null) {
        setUsers(recievedUsers);
      }
    };
  
    useFocusEffect(
        useCallback(() => {
          loadUsers();
        }, [])
      );

    React.useEffect(() => {
      loadUsers();
    }, []);

    const onClickUpdateButton = (id: number) => {
        setId(id);
        navigation.navigate("")

    }
  
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("./../assets/images/Fondo_Olympus_Server.png")}
          style={styles.image}
        >
          <View style={{ ...styles.boxShadow, ...styles.welcomeContainer }}>
            <Text style={styles.tittle}>Members List</Text>
            <ScrollView style={styles.scrollviewStyle}>
              {users.map((user) => (
                <TouchableOpacity key={user.userId}>
                    <Text>{user.userName}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  };
  
  export default ListUserScreen;
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    tittle: {
      fontWeight: "700",
      fontSize: 35,
      textAlign: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    welcomeContainer: {
      width: 350,
      height: 470,
      alignItems: "center",
      backgroundColor: AppColors.lightGreen,
      borderRadius: 30,
    },
    scrollviewStyle: {
      height: 50,
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
  