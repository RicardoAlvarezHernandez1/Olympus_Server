import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

export interface UserInterface {
    userId: number,
    userName:string,
    userMail:string,
    userPassword:string,
    userWeight:Float,
    userHeight: Float,
    navigation: NavigationProp<ParamListBase>;

}