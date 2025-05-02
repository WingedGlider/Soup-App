import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { styles, thisSemester } from "./(tabs)/index";


interface Assignment {
  name: string;
  due: Date;
  value: number;
  grade: number;
}

export default function AssignmentForm() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  function returnhome() {
    router.push({
      pathname: "./(tabs)",
    });
  }

  const handleAddAssignment = () => {
    setError('');
    if (selectedCourseIndex === null ||selectedCategoryIndex === null ||!assignmentName.trim() ||!dueDate.trim()) {
      setError("All fields must be filled.");
      return;
    }
    const course = thisSemester.courses[selectedCourseIndex];
    const category = course.categories[selectedCategoryIndex];
    const currentAssignments = category.assignments.length;
    const newValue = currentAssignments === 0 ? 100 : Math.round(100 / (currentAssignments + 1));

    const assignment: Assignment = {
      name: assignmentName,
      due: (() => {
        const parsedDate = new Date(dueDate);
        parsedDate.setUTCHours(0, 0, 0, 0);
        parsedDate.setUTCDate(parsedDate.getUTCDate() + 1);
        return parsedDate;
      })(),
      value: newValue,
      grade: 0,
    };

    category.assignments.push(assignment);
    setAssignmentName('');
    setDueDate('');
    returnhome();

  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text selectable={false} style={styles.coursetext}>Assignment Creation</Text>
        <View style={styles.form}>
          <Text selectable={false} style={styles.inputtext}>Select Course</Text>
          <FlatList
            style={styles.dropdownitem}
            data={thisSemester.courses}
            keyExtractor={(_, index) => `course-${index}`}
            renderItem={({ item, index }) => (
              <Pressable style={[selectedCourseIndex == index && styles.dropdownselect]}
                onPress={() => {setSelectedCourseIndex(index);setSelectedCategoryIndex(null);}}
              >
                <Text selectable={false} style= {styles.dropdowntext}>{item.name}</Text>
              </Pressable>
            )}
          />
            {selectedCourseIndex !== null && (
            <>
              <Text selectable={false} style={styles.inputtext}>Select Category</Text>
              <FlatList
                style={styles.dropdownitem}
                data={thisSemester.courses[selectedCourseIndex].categories}
                keyExtractor={(_, index) => `cat-${index}`}
                renderItem={({ item, index }) => (
                  <Pressable style={[selectedCategoryIndex == index && styles.dropdownselect]}
                    onPress={() => setSelectedCategoryIndex(index)}
                  >
                    <Text selectable={false} style= {styles.dropdowntext}>{item.name}</Text>
                  </Pressable>
                )}
              />
            </>
          )}
          <Text selectable={false} style={styles.inputtext}>Assignment Name</Text>
          <TextInput
            style={styles.input}
            value={assignmentName}
            onChangeText={setAssignmentName}
            placeholder="e.g. Homework 1"
          />
          <Text style={styles.inputtext}>Due Date</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
          />
          {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
          <Pressable style={styles.formbutton} onPress={handleAddAssignment}>
            <Text style={styles.formbuttontext}>Add Assignment</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}