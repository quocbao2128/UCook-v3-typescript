import React from "react";
import { Text, ScrollView } from "react-native";
import {Asset} from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {useState,useEffect} from 'react';
// import * from './src/recipes/cong-thuc-nau-an';

const loadRecipe = async () => {
    try {
      // const asset = Asset.fromModule(require())
      const uri = './src/recipes/cong-thuc-mon-an.txt';
      console.log(uri);
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if(fileInfo.exists){
      //   const [{ localUri }] = await Asset.loadAsync(uri);
      //   if(localUri)
          return FileSystem.readAsStringAsync(uri);
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
  // const [recipeContent, setRecipeContent] = useState('');

  // useEffect(() => {
  //   loadRecipe().then(content => setRecipeContent(content  as string));
  // }, []);

  // useEffect(() => {
  //   async function fetchRecipe() {
  //     try {
  //       const content = await loadRecipe();
  //       setRecipeContent(content  as string);
  //     } catch (error) {
  //       console.error(error); // Handle errors appropriately
  //     }
  //   }
  
  //   fetchRecipe();
  // }, []);

  // if (!recipeContent) return <Text>Loading recipe...</Text>;

  const recipeContent = "Cà chua sôt mỳ ý thịt bò\n  * Nguyên liệu: \n  100g mỳ ý\n  1 miếng thịt bò\n  2 quả cà chua\n  1/4 hành tây\n  nửa củ cà rốt\n  1/2 muỗng muối\n  hạt nêm\n  2 tép tỏi\n  2 thìa to sốt cà chua\n  15g bơ\n  hạt tiêu\n  lá húng quế\n  \n  * Cách làm:\n  - Xay thịt bò (thịt lợn đều được), tỏi, hành tây, cà rốt.\n  - Thái miếng cà chua.\n  - Bật chảo nóng rồi thả bơ vào, rồi thả tỏi và hành tây đã xay vào xào cho thơm đến khi ngả vàng.\n  - Thả thịt đã xay vào xào chín.\n  - Thả cà rốt, cà chua vào xào tiếp.\n  - Đổ sốt cà chua vào, xào đến khi vừa chín tới thì thả thêm húng quế, hạt tiêu, muối, hạt nêm.\n  - Vặn lửa nhỏ đun chín tương cà chua thịt bò.\n  - Dùng một nồi nước khác đun nước sôi, rồi thả mỳ vào, cho chút muối đun khoảng 7 – 8 phút là được.\n  - Gắp mỳ ra đĩa, rồi đổ sốt cà chua đã chưng lên trên là xong."

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