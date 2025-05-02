import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {View,Text,StyleSheet,Pressable,ScrollView} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./(tabs)/index";

export default function Calendar() {
  
  const { blank, query } = useLocalSearchParams();
  const id = query;
  const [course, assign] = (id as string).split(' ` ');

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <Text style = {styles.text}>This is the assignment page for the {assign} Assignment in {course}!</Text>
      </View>
    </View>
  );
}