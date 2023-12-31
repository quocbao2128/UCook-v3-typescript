import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import useStore from "../ZuStand/useStore";
const Recipe = () => {
  const navigation = useNavigation();
  const {sharedValue,updateSharedValue} = useStore();
  const [recipe, setRecipe] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const filename = `recipe_${sharedValue}.txt`;
        const filePath = FileSystem.documentDirectory + filename;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if(fileInfo.exists){
          console.log('File Exist');
          setRecipe(await FileSystem.readAsStringAsync(filePath));
        }
        else{
          console.log('File Not Exist, downloading');
          const response = await fetch(`https://u-cook-7dab6b2bf1a6.herokuapp.com/api/recipe/${sharedValue}`);        
          const data = await response.json();
          const content = data.recipe;
          console.log(content);
          await FileSystem.writeAsStringAsync(filePath,content);
          console.log(`File Saved at ${filePath}`);
          setRecipe(content);
        }
      } catch (error) {
          console.log(error);
      } finally
      {
        setIsLoading(false);
      }
    };
    fetchData();
  });
  const backToDishList = () => {
    navigation.navigate('DishList' as never);
    };
  // const recipeContent = "Cà chua sôt mỳ ý thịt bò\n  * Nguyên liệu: \n  100g mỳ ý\n  1 miếng thịt bò\n  2 quả cà chua\n  1/4 hành tây\n  nửa củ cà rốt\n  1/2 muỗng muối\n  hạt nêm\n  2 tép tỏi\n  2 thìa to sốt cà chua\n  15g bơ\n  hạt tiêu\n  lá húng quế\n  \n  * Cách làm:\n  - Xay thịt bò (thịt lợn đều được), tỏi, hành tây, cà rốt.\n  - Thái miếng cà chua.\n  - Bật chảo nóng rồi thả bơ vào, rồi thả tỏi và hành tây đã xay vào xào cho thơm đến khi ngả vàng.\n  - Thả thịt đã xay vào xào chín.\n  - Thả cà rốt, cà chua vào xào tiếp.\n  - Đổ sốt cà chua vào, xào đến khi vừa chín tới thì thả thêm húng quế, hạt tiêu, muối, hạt nêm.\n  - Vặn lửa nhỏ đun chín tương cà chua thịt bò.\n  - Dùng một nồi nước khác đun nước sôi, rồi thả mỳ vào, cho chút muối đun khoảng 7 – 8 phút là được.\n  - Gắp mỳ ra đĩa, rồi đổ sốt cà chua đã chưng lên trên là xong."
  const lines = recipe.split('\n');

  return (
    <View style={styles.center}>
      <View style={{height: 100}}/>
      <ScrollView style={{ flex: 1, paddingLeft :10, paddingRight: 10 }}>
        {lines.map((line, index) => (
          <Text key={index} style={{ fontSize: 16, lineHeight: 20 }}>{line}</Text>
        ))}
      </ScrollView>
      <TouchableOpacity style={{
          position: 'absolute',
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#fff',
          borderWidth: 2,
          borderColor: '#ff5722',
          padding: 10,
          bottom: 50, // adjust for desired padding
          left: 20, // adjust for desired padding
          zIndex: 10, // ensure text overlaps image
            }} onPress={backToDishList}>
          <Image source={require('../img/leftArrow.png')} style={{width: '100%', height: '100%',resizeMode:'contain'}}/>
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
      fontSize: 20
  },
  button: {
      fontFamily: 'Nunito_400Regular',
      color: '#D08D2F'
  },
});
export default Recipe;