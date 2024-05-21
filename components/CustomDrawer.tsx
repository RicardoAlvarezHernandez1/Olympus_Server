import React from "react";
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import RegisterScreen from "../screens/RegisterScreen";
import { AdminContext } from "../context/AdminContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import appColors from "../assets/styles/appColors";
import LoginScreen from "../screens/LoginScreen";
import AdminScreen from "../screens/AdminScreen";
import UpdateScreen from "../screens/UpdateScreen";
import AchievementScreen from "../screens/AchievementScreen";

const Drawer = createDrawerNavigator();

// CustomDrawer component definition
const CustomDrawer = () => {
  // Getting isLogged and toggleIsLogged from AdminContext
  const { isLogged, toggleIsLogged } = React.useContext(AdminContext);

  // Options for drawer navigation screens
  const drawerNavigatorScreenOptions: DrawerNavigationOptions = {
    headerTitle: "OLYMPUS",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: appColors.lightGreen,
    },
    headerTintColor: "black",
    drawerItemStyle: {
      width: "100%",
    },
    drawerActiveTintColor: "darkblue",
    drawerActiveBackgroundColor: appColors.green,
    drawerInactiveTintColor: "black",
    drawerInactiveBackgroundColor: appColors.greenishWhite,
    drawerType: "front",
  };

  // Return the UI for CustomDrawer component based on user authentication
  return (
    <>
      {isLogged ? (
        <>
          <Drawer.Navigator
            initialRouteName="WelcomeUser"
            screenOptions={drawerNavigatorScreenOptions}
          >
            <Drawer.Screen
              name="Admin"
              component={AdminScreen}
              options={{
                drawerIcon: () => (
                  <Ionicons
                    name={"people-circle-outline"}
                    size={25}
                    color={"black"}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Update"
              component={UpdateScreen}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
            <Drawer.Screen
              name="Achievements"
              component={AchievementScreen}
              options={{
                drawerItemStyle: { height: 0 },
              }}
            />
          </Drawer.Navigator>
        </>
      ) : (
        <Drawer.Navigator
          initialRouteName="Welcome"
          screenOptions={drawerNavigatorScreenOptions}
        >
          <Drawer.Screen
            name="Registration"
            component={RegisterScreen}
            options={{
              drawerIcon: () => (
                <Ionicons
                  name={"person-add-outline"}
                  size={25}
                  color={"black"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: () => (
                <Ionicons name={"log-in-outline"} size={25} color={"black"} />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </>
  );
};

export default CustomDrawer;
