import { StyleSheet, View } from "react-native";
import React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import CustomDrawer from "./components/CustomDrawer";
import AdminProvider from "./providers/AdminProvider";

export default function App() {
  return (
    <View style={styles.appContainer}>
      <AdminProvider>
        <NavigationContainer>
          <CustomDrawer></CustomDrawer>
        </NavigationContainer>
      </AdminProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
