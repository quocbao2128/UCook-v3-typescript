import React,{useEffect,useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

type Dish = {
    id: number;
    name: string;
    imageUri: string;
}

const DishList = () =>{
    const navigation = useNavigation();
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let hasError = false;
    let dishesData = [];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://u-cook-7dab6b2bf1a6.herokuapp.com/api/dishList/1');
                const data = await response.json();
                dishesData = data.dishes;
                await Promise.all(dishesData.map(async (dish: Dish) => {
                      const filename = `dish_${dish.id}.jpg`;
                      const filePath = FileSystem.cacheDirectory + filename;
                      const info = await FileSystem.getInfoAsync(filePath);
                    //   if(!info.exists){
                        await FileSystem.downloadAsync(
                            `https://u-cook-7dab6b2bf1a6.herokuapp.com/api/dishImage/${dish.id}`,
                            filePath
                          )
                            .then(({ uri }) => {
                              console.log('Finished downloading to ', uri);
                              dish.imageUri = filePath;
                            })
                    //   }
                    })
                  );
                setDishes(dishesData);
            } catch (error) {
                console.log(error);
                hasError = true;
            } finally {
                setIsLoading(false);
            }
    };
        fetchData();
    }, []);
      const backToHome = () => {
        navigation.navigate('Home' as never);
        };
      const goToRecipe = () =>{
        navigation.navigate('Recipe' as never)
      }
        // let [fontsLoaded] = useFonts({Nunito_400Regular,});
        // if(!fontsLoaded || isLoading){
        //     return <AppLoading/>
        // } else {
            
        // }

        return(
            <View style={styles.center}>
                <View style={{height: 100}}/>
                <View>
                    <Text style={styles.baseText}>Danh sách các món ăn dựa trên nguyên liệu</Text>
                </View>
            
                <ScrollView style={{ flex: 1}}>
                    {dishes.map((dish) => (
                    <TouchableOpacity style={{
                        width: 350, // adjust width and height as needed
                        height: 200, // adjust height as needed
                        borderRadius: 50, // adjust for desired roundness
                        backgroundColor: '#fff', // change background color if needed
                        justifyContent: 'center', // center vertically
                        alignItems: 'flex-start', // align text to left
                        margin: 10, // adds 10px space around the button
                      }}
                      onPress={goToRecipe}
                    key={dish.id}
                      >
                        <Image source={{ uri: dish.imageUri }} style={{ width: '100%', height: '100%', resizeMode: 'stretch',borderRadius: 20, }} />
                        <Text style={{
                            position: 'absolute',
                            bottom: 10, // adjust for desired padding
                            left: 10, // adjust for desired padding
                            zIndex: 10, // ensure text overlaps image
                            textAlign: 'left',
                            color:'white',
                            textShadowColor: 'black', // outline color
                            textShadowRadius: 3, // outline width
                            fontSize:15,
                            }}>
                                {dish.name}
                        </Text> 
                      </TouchableOpacity>
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
                    }} onPress={backToHome}>
                        <Image source={require('../img/leftArrow.png')} style={{width: '100%', height: '100%',resizeMode:'contain'}}/>
                </TouchableOpacity>
                <View style={{height:30}}/>
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
export default DishList;