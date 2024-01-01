import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import useStore from "../ZuStand/useStore";
import Icon from 'react-native-vector-icons/AntDesign';
import TimeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

type Dish = {
    id: number;
    name: string;
    imageUri: string;
    time: number;
}

const DishList = () => {
    const { sharedValue, updateSharedValue } = useStore();
    const navigation = useNavigation();
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let hasError = false;
    let dishesData = [];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = sharedValue;
                dishesData = data.dishes;
                await Promise.all(dishesData.map(async (dish: Dish) => {
                    const filename = `dish_${dish.id}.jpg`;
                    const filePath = FileSystem.cacheDirectory + filename;
                    const info = await FileSystem.getInfoAsync(filePath);
                    if (!info.exists) {
                        await FileSystem.downloadAsync(
                            `https://u-cook-7dab6b2bf1a6.herokuapp.com/api/dishImage/${dish.id}`,
                            filePath
                        )
                            .then(({ uri }) => {
                                console.log('Finished downloading to ', uri);
                                dish.imageUri = filePath;
                            });
                    }
                    else {
                        dish.imageUri = filePath;
                    }
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
    const goToRecipe = (id) => {
        updateSharedValue(id)
        navigation.navigate('Recipe' as never)
    }

    return (
        <View style={styles.center}>
            <View style={{ height: '8%' }} />
            <View style={styles.title}>
                <Text style={[styles.baseText, styles.titleText]}>Danh sách các món ăn dựa trên nguyên liệu</Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {dishes.map((dish: Dish) => (
                    <TouchableOpacity style={{
                        width: 350, // adjust width and height as needed
                        height: 200, // adjust height as needed
                        borderRadius: 30, // adjust for desired roundness
                        backgroundColor: '#fff', // change background color if needed
                        justifyContent: 'center', // center vertically
                        alignItems: 'flex-start', // align text to left
                        margin: 10, // adds 10px space around the button
                        overflow: "hidden",
                        // borderWidth: 1,
                    }}
                        onPress={() => goToRecipe(dish.id)}
                        key={dish.id}
                    >
                        <Image source={{ uri: dish.imageUri }} style={{ width: '100%', height: '100%', resizeMode: 'stretch', }} />
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.background}
                        />
                        <Text style={styles.dishText}>
                            {dish.name + '\n'}
                            <TimeIcon name="clock-time-four" size={15} color="white" />
                            {' ' + dish.time + ' phút'}
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
                borderColor: '#D08D2F',
                padding: 10,
                bottom: 50, // adjust for desired padding
                left: 20, // adjust for desired padding
                zIndex: 10, // ensure text overlaps image
                alignItems: 'center',
                justifyContent: 'center',
            }} onPress={backToHome}>
                {/* <Image source={require('../img/leftArrow.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} /> */}
                <Icon name="arrowleft" size={40} color="#D08D2F" />
            </TouchableOpacity>
            <View style={{ height: 30 }} />
        </View>
    );
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        // backgroundColor: '#fff',
        // padding: 20,
        // margin: 10,
        borderWidth: 1,
        borderColor: 'red',
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
    dishText: {
        position: 'absolute',
        bottom: 10, // adjust for desired padding
        left: 10, // adjust for desired padding
        zIndex: 10, // ensure text overlaps image
        textAlign: 'left',
        color: 'white',
        textShadowColor: 'black', // outline color
        textShadowRadius: 3, // outline width
        fontSize: 15,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        // top: 'auto',
        bottom: 0,
        height: '40%',
    },
});
export default DishList;