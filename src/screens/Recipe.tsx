import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as FileSystem from 'expo-file-system';
const loadRecipe = async () => {
  let content;
  try {
    content = await FileSystem.readAsStringAsync('../img/cong-thuc-mon-an.txt', { encoding: 'utf8' });
    // Use the content in your scroll view, e.g., with Text component
    console.log(content);
  } catch (error) {
    console.error('>>>ERR', error);
  }
  return content;
};
const Recipe = () => {
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