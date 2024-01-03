import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Fontisto } from '@expo/vector-icons';

const NotIdentifiable = () => {
    const navigation = useNavigation();

    const handleNavigate = (toPage: string) => {
        navigation.navigate(toPage as never);
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.outer}>
            <ImageBackground source={require('../img/ingedients-img_waifu2x_3x_1n_png.png')} resizeMode='stretch' style={styles.image}>
                <View style={styles.innerView}>
                    <View style={styles.title}>
                        <View style={styles.titleOption}>
                            <Text style={[styles.baseText, styles.titleText]}>{'Không tìm thấy nguyên liệu.\n Vui lòng trở về và thử lại.'}</Text>
                        </View>
                        <View style={[styles.usecameraBtn]}>
                            <Fontisto name="file-1" size={150} color="#ECD1AC" style={styles.fileIcon} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
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
            }} onPress={() => handleNavigate('Home')}>
                <Icon name="arrowleft" size={40} color="#D08D2F" />
            </TouchableOpacity>
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
        marginTop: '10%',
        // flexDirection: 'column',
        // width: '100%',
        alignItems: "center",
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    title: {
        marginTop: '20%',
        flex: 0.8,
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
        width: '90%',
        height: 100,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginBottom: '20%',
    },
    titleText: {
        fontSize: 24,
        // padding: '90%',
        // borderWidth: 2,
        // borderColor: 'blue',
        height: '100%',
        width: '100%'
    },
    usecameraBtn: {
        // flex: 0.7,
        // height: '20%',
        // width: '80%',
        // borderWidth: 1,
        // borderColor: 'green',
        // borderRadius: 50,
        // marginTop: 'auto',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    fileIcon: {
        // borderWidth: 3,
        // borderColor: 'pink',
        // borderRadius: 50,
        // overflow: "hidden"
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

export default NotIdentifiable;
