import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import useStore from "../ZuStand/useStore";
const Recipe = () => {
  const navigation = useNavigation();
  const { sharedValue, updateSharedValue } = useStore();
  const [recipe, setRecipe] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filename = `recipe_${sharedValue}.txt`;
        const filePath = FileSystem.documentDirectory + filename;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          console.log('File Exist');
          setRecipe(await FileSystem.readAsStringAsync(filePath));
        }
        else {
          console.log('File Not Exist, downloading');
          const response = await fetch(`https://u-cook-7dab6b2bf1a6.herokuapp.com/api/recipe/${sharedValue}`);
          const data = await response.json();
          const content = data.recipe;
          console.log(content);
          await FileSystem.writeAsStringAsync(filePath, content);
          console.log(`File Saved at ${filePath}`);
          setRecipe(content);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  });
  const backToDishList = () => {
    navigation.navigate('DishList' as never);
  };
  const lines = recipe.split('\n');

  return (
    <View style={styles.center}>
      <View style={{ height: 50 }} />
      <View style={styles.title}>
        <Text style={[styles.baseText, styles.titleText]}>Công thức món ăn</Text>
      </View>
      <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        {lines.map((line, index) => (
          <Text key={index} style={{ fontSize: 20, lineHeight: 30 }}>{line}</Text>
        ))}
      </ScrollView>
      <TouchableOpacity style={{
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#D08D2F',
        padding: 10,
        bottom: 50, // adjust for desired padding
        left: 20, // adjust for desired padding
        zIndex: 10, // ensure text overlaps image
        alignItems: 'center',
        justifyContent: 'center',
      }} onPress={backToDishList}>
        <Icon name="arrowleft" size={40} color="#D08D2F" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center"
    // backgroundColor: '#fff',
    // padding: 20,
    // margin: 10,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  top: {
    flex: 0.4,
    // backgroundColor: 'grey',
    // borderWidth: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.6,
    // backgroundColor: 'beige',
    // borderWidth: 5,
  },
  bottom: {
    flex: 0.1,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  baseText: {
    fontFamily: 'Nunito_400Regular',
    textAlign: "center",
    fontSize: 20,
  },
  title: {
    marginTop: '5%',
    marginBottom: '5%',
  },
  titleText: {
    fontSize: 24,
    // padding: '90%',
  },
  button: {
    fontFamily: 'Nunito_400Regular',
    color: '#D08D2F'
  },
});
export default Recipe;