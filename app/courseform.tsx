import { useRouter } from "expo-router";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { styles, thisSemester } from "./(tabs)/index";

interface Course {
  name: string;
  identifier: string;
  grade: number;
  categories: Category[];
}

interface Category {
  name: string;
  grade: number;
  weight: number;
  assignments: Assignment[];
}

interface Assignment {
  name: string;
  due: Date;
  value: number;
  grade: number;
}

interface Props {}

export default function CourseForm(_: Props) {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryWeight, setNewCategoryWeight] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  function returnhome() {
    router.push({
      pathname: "./(tabs)/",
    });
  }

  const getTotalWeight = () => {
    return categories.reduce((total, cat) => total + cat.weight, 0);
  };

  const addCategory = () => {
    setError('');
    if (!newCategoryName) {
      setError('Category name cannot be empty.');
      return;
    }
    const currentTotalWeight = getTotalWeight();
    let weight: number;

    if (!newCategoryWeight) {
      const remaining = 100 - currentTotalWeight;
      if (remaining <= 0) {
        setError('Total weight already equals or exceeds 100%.');
        return;
      }
      weight = remaining;
    } else {
      weight = parseFloat(newCategoryWeight);
      if (isNaN(weight) || weight <= 0) {
        setError('Weight must be a valid number greater than 0.');
        return;
      }
      if (currentTotalWeight + weight > 100) {
        setError('Total weight cannot exceed 100%.');
        return;
      }
    }

    const newCategory: Category = {
      name: newCategoryName,
      weight,
      grade: 0,
      assignments: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryWeight('');
  };

  const removeCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const submitCourse = () => {
    setError('');

    if (!name.trim() || !identifier.trim()) {
      setError('Course name and identifier are required.');
      return;
    }

    const newCourse: Course = {
      name,
      identifier,
      grade: 0,
      categories,
    };

    thisSemester.courses.push(newCourse);
    setName('');
    setIdentifier('');
    setCategories([]);
    returnhome();
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text selectable={false} style={styles.coursetext}>Course Creation Page</Text>

        <View style={styles.form}>
          <Text selectable={false} style={styles.inputtext}>Course Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Course Name"
          />

          <Text selectable={false} style={styles.inputtext}>Course Identifier</Text>
          <TextInput
            style={styles.input}
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="e.g. CS101"
          />

          <Text selectable={false} style={styles.inputtext}>New Category Name</Text>
          <TextInput
            style={styles.input}
            value={newCategoryName}
            onChangeText={setNewCategoryName}
            placeholder="e.g. Homework, Quizzes"
          />

          <Text style={styles.inputtext}>New Category Weight (%)</Text>
          <TextInput
            style={styles.input}
            value={newCategoryWeight}
            onChangeText={setNewCategoryWeight}
            placeholder="e.g 30"
            keyboardType="numeric"
          />

          {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}

          <Pressable style={styles.formbutton} onPress={addCategory}>
            <Text selectable={false} style={styles.formbuttontext}>Add Category</Text>
          </Pressable>

          <FlatList
            data={categories}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.categoryitem}>
                <Text selectable={false} style={styles.categories}>
                  {`${item.name} (${item.weight}%)`}
                </Text>
                <Pressable onPress={() => removeCategory(index)}>
                  <Text selectable={false} style={styles.deletecategory}>x</Text>
                </Pressable>
              </View>
            )}
          />

          <Pressable style={styles.formbutton} onPress={submitCourse}>
            <Text style={styles.formbuttontext} selectable={false}>Create Course</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}