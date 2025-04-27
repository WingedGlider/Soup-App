import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {View,Text,StyleSheet,Pressable,ScrollView} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./index";

export default function Courses() {

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <Text style = {styles.text}>This is the courses page!</Text>
      </View>
    </View>
  );
}