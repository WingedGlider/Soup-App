import { useRouter,useLocalSearchParams  } from "expo-router";
import {View,Text,StyleSheet,Pressable,ScrollView} from "react-native";
import { useState, useEffect } from "react";
import { thisSemester, getLetter, styles } from "./index";

export default function Courses() {
  const router = useRouter();
  function touchnewCourse() {
    router.push({
      pathname: "../courseform",
    });
  }
  function touchcourse(id:String) {
    router.push({
      pathname: "../course",
      params: {query: `${id}`},
    });
  }
  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <Text style = {styles.coursetext} selectable = {false}>Your Courses</Text>
        <ScrollView style = {styles.coursecontainer}>
          {thisSemester.courses.filter(course => course.name !== undefined).map((course, index) => (
            <Pressable key={index} onPress={() => touchcourse(course.identifier)} style={styles.course}>
            </Pressable>
          ))}
          <Pressable style = {styles.addcourse} onPress={() => touchnewCourse()}>
            <Text style = {styles.addtext} selectable = {false}>+</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}