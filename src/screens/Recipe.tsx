import React from "react";
import { Text, ScrollView } from "react-native";
import {Asset} from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {useState,useEffect} from 'react';

const loadRecipe = async () => {
    try {
      // const asset = Asset.fromModule(require())
      const uri = '../recipe.txt';
      console.log(uri);
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if(fileInfo.exists){
        const [{ localUri }] = await Asset.loadAsync(uri);
        if(localUri)
          return FileSystem.readAsStringAsync(localUri);
      }
      else
      {
        console.log("file not exist:" + fileInfo.uri)
      }
      return
    } catch (error) {
      console.error(error);
    }
  };
const Recipe =() =>{
  const [recipeContent, setRecipeContent] = useState('');

  useEffect(() => {
    loadRecipe().then(content => setRecipeContent(content));
  }, []);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const content = await loadRecipe();
        setRecipeContent(content);
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    }
  
    fetchRecipe();
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