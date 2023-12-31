import React, { useCallback, useState } from "react";
import { View, Button, Text, StyleSheet, Image, SafeAreaView, TextInput, Pressable, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ImageBackground } from "react-native";
// import { useFonts, Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { openCamera } from "./CameraCapture";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Home = () => {
    const navigation = useNavigation();
    const [text, onChangeText] = React.useState('');
    const [image, setImage] = useState<string | null>(null);

    // const pickImage = async () => {
    //     const uri = await openCamera();
    //     if (uri) {
    //         setImage(uri);
    //         handleNavigate();
    //     }
    // };

    const handleNavigate = (toPage: string) => {
        navigation.navigate(toPage as never);
    };

    const handleSubmit = () => {
        //* TODO: call API to get dish list by text input value
        console.log('>>>text input value:', text);
        Keyboard.dismiss();
        //* if does not recognize the ingredients of empty text input
        if (!text) {
            handleNavigate('NotIdentifiable');
        } else {
            //* else go to Dish list screen
            handleNavigate('DishList');
        }
    };
    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.outer}>
            <ImageBackground source={require('../img/ingedients-img_waifu2x_3x_1n_png.png')} resizeMode='stretch' style={styles.image}>
                <View style={styles.innerView}>
                    <View style={styles.title}>
                        <View style={styles.titleOption}>
                            <Text style={[styles.baseText, styles.titleText]}>{'Bạn muốn tìm nguyên liệu bằng cách nào?'}</Text>
                        </View>
                        <View style={styles.usecameraBtn}>
                            <Pressable style={styles.button}
                                onPress={() => handleNavigate('CameraCaptureNote')}>
                                <Text style={[styles.baseText, styles.buttonText]}>
                                    {'Sử dụng camera điện thoại'}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.orView}>
                        <Text style={[styles.baseText, styles.orText]}>{'hoặc'}</Text>
                    </View>
                    <View style={styles.bottom}>
                        <ScrollView keyboardShouldPersistTaps='always' style={styles.safeView}>
                            <TextInput
                                style={[styles.baseText, styles.input, { height: 50 }]}
                                onChangeText={text => onChangeText(text)}
                                value={text}
                                placeholder='Nhập một tên nguyên liệu'
                                keyboardType='default'
                                selectionColor={'#D08D2F'}
                                caretHidden={false}
                            />
                        </ScrollView>
                        <View style={styles.searchView}>
                            <Pressable style={[styles.button, styles.searchBtn]}
                                onPress={handleSubmit}>
                                <Icon name="search1" size={20} color="white" style={styles.searchIcon} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}
// };

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // borderWidth: 1,
        // borderColor: 'red',
        // marginTop: '15%',
        // backgroundColor: '#fff',
        // padding: 20,
        // margin: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    innerView: {
        flex: 1,
        // position: 'absolute',
        marginTop: '15%',
        // flexDirection: 'column',
        // width: '100%',
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    title: {
        marginTop: '20%',
        flex: 0.5,
        // borderWidth: 1,
        width: '100%',
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    titleOption: {
        // marginTop: '10%',
        // borderWidth: 1,
        // borderColor: 'red',
        width: '80%',
        height: 80,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: '20%',
    },
    titleText: {
        fontSize: 24,
        // padding: '90%',
    },
    usecameraBtn: {
        flex: 0.4,
        height: '20%',
        width: '80%',
        // borderWidth: 1,
        // borderColor: 'blue',
        marginTop: 'auto',
    },
    button: {
        // fontFamily: 'Nunito_400Regular',
        // color: '#D08D2F',
        backgroundColor: '#D08D2F',
        width: "auto",
        height: '100%',
        // borderWidth: 1,
        borderRadius: 50,
        justifyContent: "center",
        // marginTop: "auto",
    },
    orView: {
        // borderWidth: 1,
        // flex: 0.1,
        marginTop: '10%',
        marginBottom: '10%',
    },
    orText: {
        width: "auto",
    },
    bottom: {
        // flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'pink',
        // borderWidth: 1,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // borderWidth: 1,
        // marginTop: '5%',
        // height: '50%',
        width: "80%",
        // alignItems: 'center',
    },
    safeView: {
        // overflow: 'hidden',
        // flex: 1,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#D08D2F',
        height: 50,
        width: '100%',
        // alignSelf: 'flex-start',
        // marginTop: "10%",
    },
    input: {
        // flex: 1,
        // height: 10,
        marginTop: 0,
        // borderWidth: 1,
        // borderColor: 'blue',
        width: '90%',
        padding: 0,
        textAlign: 'center',
        paddingLeft: 5,
    },
    searchView: {
        // flex: 0.3,
        // borderRadius: 0.15,
        // borderWidth: 1,
        borderColor: 'red',
        position: 'absolute',
        right: '0%'
    },
    searchBtn: {
        width: 50,
        height: 50,
        // borderWidth: 1,
        // marginTop: "0%",
        // marginLeft: '25%',
        borderRadius: 100,
        alignItems: 'center',
    },
    searchIcon: {

    },
    baseText: {
        fontSize: 17,
        fontFamily: 'Nunito_400Regular',
        textAlign: "center",
    },

    buttonText: {
        color: "white",
        fontFamily: "Nunito_600SemiBold",
        // fontSize: 24,
    },

});

export default Home;
