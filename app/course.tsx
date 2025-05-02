import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import {View,Text,StyleSheet,Pressable,ScrollView} from "react-native";
import { styles } from "./(tabs)/index";


export default function Course() {

const { blank, query } = useLocalSearchParams();
const id = query;
  
return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <Text style = {styles.text}>This is the individual course page for {id}!</Text>
      </View>
    </View>
  );
}