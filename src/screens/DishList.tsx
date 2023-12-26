import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

const DishList = () =>{
    const buttons = [
        { key: '1',text: 'Cà chua sốt Cá hồi', image: require('../img/ca-chua-sot-ca-hoi.jpg') },
        { key: '2',text: 'Cà chua sốt mì Ý thịt bò', image: require('../img/ca-chua-sot-mi-y-thit-bo.jpg') },
        { key: '3',text: 'Canh cà chua', image: require('../img/canh-ca-chua.jpg')},
        { key: '4',text: 'Canh chua cá lóc',image: require('../img/canh-chua-ca-loc.jpg')}
      ];
      const navigation = useNavigation();
      const backToHome = () => {
        navigation.navigate('Home' as never);
        };
      const goToRecipe = () =>{
        navigation.navigate('Recipe' as never)
      }
        let [fontsLoaded] = useFonts({Nunito_400Regular,});
        if(!fontsLoaded){
            return <AppLoading/>
        } else {
            return(
                <View style={styles.center}>
                    <View style={{height: 100}}/>
                    <View>
                        <Text style={styles.baseText}>Danh sách các món ăn dựa trên nguyên liệu</Text>
                    </View>
                
                    <ScrollView style={{ flex: 1}}>
                        {buttons.map((button) => (
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
                        key={button.key}
                          >
                            <Image source={button.image} style={{ width: '100%', height: '100%', resizeMode: 'stretch',borderRadius: 20, }} />
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
                                    {button.text}
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