import { useRouter } from "expo-router";
import {View,Text,StyleSheet,Pressable,ScrollView,} from "react-native";

export default function Index() {

  const router = useRouter();
  function touchnewCourse() {
    router.push({
      pathname: "../courseform",
    });
  }
  function touchnewAssign() {
    router.push({
      pathname: "../assignform",
    });
  }
  function touchcourse(id:String) {
    router.push({
      pathname: "../course",
      params: {query: `${id}`},
    });
  }
  function touchassign(course:String, assignment:String){
    router.push({
      pathname: "../assignment",
      params:{query: `${course +' ` '+ assignment}`}
    });
  }

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <View style = {styles.block}>
          <Text style = {styles.text} selectable={false}>{thisSemester.name}</Text>
          <ScrollView horizontal={true} style = {styles.scroll}>
            {thisSemester.courses.filter(course => course.name !== undefined).map((course, index) => (
            <Pressable key={index} onPress={() => touchcourse(course.identifier)} style={styles.item}>
              <Text style={styles.itemtext} selectable={false}>{course.identifier +": "+ course.name}</Text>
              <Text style={styles.gradetext} selectable={false}>{getLetter(course.grade)}</Text>
            </Pressable>
           ))}
            <Pressable onPress={() => touchnewCourse()} style={styles.addnew}>
              <Text style = {styles.addtext} selectable={false}>+</Text>
            </Pressable>
          </ScrollView>
        </View>
        <View style = {styles.block}>
          <Text style = {styles.text} selectable={false}>This Week</Text>
          <ScrollView horizontal={true} style={styles.scroll}>
            {thisSemester.courses.flatMap(course =>course.categories.flatMap(category =>category.assignments.filter(a => {
              const now = new Date();
              const nextWeek = new Date();
              nextWeek.setDate(now.getDate() + 7);
              const due = new Date(a.due);
              return due >= now && due <= nextWeek;
            })
            .map(a => ({...a,fullName: `${course.name}: ${a.name}`})).map((assignment, index) => (
            <Pressable key={index} onPress={() => touchassign(course.name, assignment.name)} style={styles.item}>
              <Text style={styles.itemtext} selectable={false}>{assignment.fullName}</Text>
              <Text style={styles.gradetext} selectable={false}>{new Date(assignment.due).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
            </Pressable>))))}
            <Pressable onPress={() => touchnewAssign()} style={styles.addnew}>
              <Text style = {styles.addtext} selectable={false}>+</Text>
            </Pressable>
          </ScrollView>
        </View>
        <View style = {styles.block}>
          <Text style = {styles.text} selectable={false}>Work Items</Text>
          <ScrollView horizontal={true} style = {styles.scroll}>
          {thisSemester.courses.flatMap(course =>course.categories.flatMap(category =>category.assignments.filter(a => {
              const now = new Date();
              const nextMonth = new Date();
              nextMonth.setDate(now.getDate() + 30);
              const due = new Date(a.due);
              return due >= now && due <= nextMonth;
            })
            .map(a => ({...a,fullName: `${course.name}: ${a.name}`})).map((assignment, index) => (
            <Pressable key={index} onPress={() => touchassign(course.name, assignment.name)} style={styles.item}>
              <Text style={styles.itemtext} selectable={false}>{assignment.fullName}</Text>
              <Text style={styles.gradetext} selectable={false}>{new Date(assignment.due).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Text>
            </Pressable>))))}
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
    alignItems: "center",
    justifyContent: "center",
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
  },
  coursetext:{
    color: 'white',
    fontSize: 25,
    borderColor: 'white',
    borderBottomWidth: 3,
    marginTop: 20,
  },
  addcourse:{
    backgroundColor: "#23395D",
    height: 150,
    borderRadius: 15,
    borderWidth: 5, 
    borderColor: "#4c6b8a",
    alignItems: 'center',
    justifyContent: 'center',
  },
  coursecontainer:{
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
  },
  course:{
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#23395D",
    height: 400,
    borderRadius: 15,
    borderWidth: 5, 
    borderColor: "#4c6b8a",
    padding: 40,
  },
  input:{
    borderWidth: 4,
    borderColor: "#4c6b8a",
    backgroundColor: "#121725",
    borderRadius: 7,
    width: '70%',
    height: 40,
    color: 'white',
  },
  form:{
    backgroundColor: "#192841",
    height: '90%',
    width: '85%',
    borderRadius: 15,
    marginTop: 30,
    gap: 20,
    paddingLeft: 30,
    paddingRight: 30, 
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom:30,
  },
  inputtext:{
    color: "white",
    paddingBottom: 4,
    fontSize: 17,
    borderBottomWidth: 2,
    borderColor: "white",
  },
  formbutton:{
    backgroundColor: "#121725",
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "#4c6b8a",
  },
  formbuttontext:{
    color: 'white',
    fontSize: 20,
  },
  categories:{
    color: 'white',
    fontSize: 15,
    marginBottom: 5,
    marginRight: 'auto',
  },
  categoryitem:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  deletecategory:{
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    width: 25,
    height: 25,
    textAlign: 'center',
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
  grade: number; //calculated by all the grade of all assignments in the category. HERE [logic]
  weight: number; //Assigned in the course page when adding a new category, indicates what percentage of the course grade the category makes up
  assignments: Assignment[]; 
}

interface Assignment{
  name: String; // Assigned by user in assignment creation
  due: Date; // Assigned by user in assignment creation, informs the date the assignment is due
  value: number; // Assigned by user in assignment creation, informs how much the assignment is worth to the category
  grade: number;// Assigned by user in assignment creation, gives a percentage value for the assignment
}

// I need to be able to add new courses to the semester, new categories to each course, and new assignments to each category. I need to be able to update and change
// all data that is not determined by other data.

export function getLetter(grade: number){
  if (grade >= 97) return "A+";
  if (grade >= 93) return "A";
  if (grade >= 90) return "A-";
  if (grade >= 87) return "B+";
  if (grade >= 83) return "B";
  if (grade >= 80) return "B-";
  if (grade >= 77) return "C+";
  if (grade >= 73) return "C";
  if (grade >= 70) return "C-";
  if (grade >= 67) return "D+";
  if (grade >= 63) return "D";
  if (grade >= 60) return "D-";
  return "F";
}

export const thisSemester: Semester = {
  name: "Spring",
  courses: [
    {
      name: "2D Design",
      identifier: "ART101",
      grade: 90,
      categories: [
        {
          name: "Projects",
          grade: 90,
          weight: 0.5,
          assignments: [
            {
              name: "Texture Tile Assignment",
              due: new Date("2025-05-04"),
              value: 100,
              grade: 95,
            },
            {
              name: "Sketch Practice",
              due: new Date("2025-06-01"),
              value: 50,
              grade: 88,
            },
          ],
        },
      ],
    },
  ],
};
  