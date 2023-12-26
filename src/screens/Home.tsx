import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, SafeAreaView, TextInput } from "react-native";
import { useFonts, Nunito_400Regular } from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import { openCamera } from "./CameraCapture";
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();
    const [text, onChangeText] = React.useState('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        const uri = await openCamera();
        if (uri) {
          setImage(uri);
          handleNavigate();
        }
      };

    const handleNavigate = () => {
        navigation.navigate('Danh sách món ăn' as never);
    };
    let [fontsLoaded] = useFonts({
        Nunito_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.center}>
                <View style={styles.top}>
                    <Image source={require('../img/UCook-removebg.png')} style={styles.logo} />
                </View>
                <View style={styles.middle}>
                    <Text style={styles.baseText}>Bạn muốn tìm nguyên liệu bằng cách nào ?</Text>
                    <Button title="Sử sụng camera điện thoại" color={styles.button.color} onPress={pickImage}/>
                    <Text style={styles.baseText}>Hoặc</Text>
                    <SafeAreaView >
                        <TextInput
                            style={[styles.input, styles.baseText, { height: 50 }]}
                            onChangeText={text => onChangeText(text)}
                            value={text}
                            placeholder="Nhập một tên nguyên liệu vào đây"
                        />
                    </SafeAreaView>
                    <Button title="Tìm" color={styles.button.color} onPress={handleNavigate}/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'space-between',
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
        textAlign: "center"
    },
    button: {
        fontFamily: 'Nunito_400Regular',
        color: '#D08D2F'
    },
});

export default Home;
