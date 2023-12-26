import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FileSystem } from 'expo';
const loadRecipe = async () => {
    try {
      const content = await FileSystem.readAsStringAsync('..src/img/cong-thuc-mon-an.txt');
      // Use the content in your scroll view, e.g., with Text component
    } catch (error) {
      console.error(error);
    }
  };
const Recipe =() =>{
    const [recipeContent, setRecipeContent] = useState('');

  useEffect(() => {
    loadRecipe().then(content => setRecipeContent(content));
  }, []);

  if (!recipeContent) return <Text>Loading recipe...</Text>;

  const lines = recipeContent.split('\n');

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {lines.map((line, index) => (
        <Text key={index} style={{ fontSize: 16, lineHeight: 20 }}>{line}</Text>
      ))}
    </ScrollView>
  );
}

export default Recipe;