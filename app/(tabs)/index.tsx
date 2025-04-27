import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {View,Text,StyleSheet,Pressable,ScrollView,} from "react-native";
import { useState, useEffect } from "react";

export default function Index() {
  const router = useRouter();
  function touchnew() {
    router.push({
      pathname: "../form",
    });
  }
  function touchcourse() {
    router.push({
      pathname: "../course",
    });
  }
  function touchassign(){
    router.push({
      pathname: "../assignment",
    });
  }
  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <View style = {styles.block}>
          <Text style = {styles.text} selectable={false}>Spring 2025</Text>
          <ScrollView horizontal={true} style = {styles.scroll}>
            <Pressable onPress={() => touchnew()} style={styles.addnew}>
              <Text style = {styles.addtext} selectable={false}>+</Text>
            </Pressable>
            <Pressable onPress={() => touchcourse()} style={styles.item}>
              <Text style = {styles.itemtext} selectable={false}>Example Class 123:</Text>
              <Text style = {styles.gradetext} selectable={false}>A</Text>
            </Pressable> 
          </ScrollView>
        </View>
        <View style = {styles.block}>
          <Text style = {styles.text} selectable={false}>This Week</Text>
          <ScrollView horizontal={true} style = {styles.scroll}>
            <Pressable onPress={() => touchnew()} style={styles.addnew}>
              <Text style = {styles.addtext} selectable={false}>+</Text>
            </Pressable>
            <Pressable onPress={() => touchassign()} style={styles.item}>
              <Text style = {styles.itemtext} selectable={false}>2D Design: Texture Tile Assignment</Text>
              <Text style = {styles.gradetext} selectable={false}>May 1</Text>
            </Pressable> 
          </ScrollView>
        </View>
        <View style = {styles.block}>
          <Text style = {styles.text} selectable={false}>Work Items</Text>
          <ScrollView horizontal={true} style = {styles.scroll}>
            <Text style = {styles.itemtext} selectable={false}>All caught up!</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  page:{
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container:{
    backgroundColor: "#121725",
    height: "100%",
    width: "100%",
    maxWidth: 500,
  },
  text:{
    color: "white",
    marginLeft: 25,
    paddingBottom: 4,
    fontSize: 17,
    borderBottomWidth: 2,
    borderColor: "white",
  },
  itemtext:{
    color: "white",
    fontSize: 16,
    height: "50%",
  },
  gradetext:{
    color: "white",
    fontSize: 26,
  },
  addtext:{
    fontSize: 55,
    color: "white",
    paddingBottom: "5%",
  },
  block:{
    paddingTop: 40,
    height: "33%",
    width: "100%",
  },
  scroll:{
    backgroundColor: "#192841",
    margin: 20,
    borderRadius: 15,
    flexDirection: "row",
    padding: 15,
    maxHeight: 180,
  },
  item:{
    backgroundColor: "#23395D",
    borderRadius: 15,
    flex: 1,
    width: 200,
    marginRight: 20,
    borderWidth: 5,
    borderColor: "#121725",
    textAlign: "left",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
  },
  addnew:{
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#23395D",
    width: 150,
    borderWidth: 5,
    borderColor: "#4c6b8a",
    marginRight: 20,
    borderRadius: 15,
  }
});

interface Semester{
  name: String; //Assigned via current date: August - December = Fall; January - first 10 days of May = Spring; Latter part of May - July = Summer;
  courses: Course[]; 
}

interface Course{
  name: String; // Assigned in course creation
  identifier: String; // Assigned in course creation
  grade: number; // Assigned by grades/weights of each category. HERE [How is the logic determined?]
  categories: Category[]
}

interface Category{
  name: String; // Assigned in the course page when adding a new category
  grade: number; //calculated by all the grade of all assignments in the category
  weight: number; //Assigned in the course page when adding a new category, indicates what percentage of the course grade the category makes up
  assignments: Assignment[];
}

interface Assignment{
  name: String; // Assigned by user in assignment creation 
  due: Date; // Assigned by user in assignment creation 
  value: number; // Assigned by user in assignment creation 
  grade: number;// Assigned by user in assignment creation 
}