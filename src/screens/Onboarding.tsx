import { Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnboardFlow } from 'react-native-onboard';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import AppLoading from 'expo-app-loading';


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    baseText: {
        fontFamily: 'VarelaRound_400Regular'
    }
});

const Onboarding = () => {
    const navigation = useNavigation();
    // di toi Home page, tu Home khong quay lai duoc Onboarding
    const handleNavigate = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' as never }],
        });
    };

    let [fontsLoaded] = useFonts({
        VarelaRound_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <OnboardFlow
                    type='fullscreen' // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
                    showDismissButton={!!'false'}
                    onDone={handleNavigate}
                    primaryButtonTextStyle={styles.baseText}
                    pages={[
                        {
                            title: 'Nhận dạng nguyên liệu',
                            subtitle: 'Hãy cho tôi thấy nguyên liệu bạn cần nấu ăn, sau đó tôi sẽ cung cấp cho bạn danh sách món ăn dựa trên nguyên liệu đó.',
                            textStyle: styles.baseText,
                            imageUri: Image.resolveAssetSource(require('../img/UCook__2_-removebg-preview.png')).uri
                        },
                        {
                            title: 'Lựa chọn món ăn',
                            subtitle: 'Chọn món từ danh sách các món ăn để xem chi tiết cách nấu.',
                            textStyle: styles.baseText,
                            imageUri: Image.resolveAssetSource(require('../img/UCook__3_-removebg-preview.png')).uri
                        },
                        {
                            title: 'Bắt đầu nấu thôi nào',
                            subtitle: 'Các bước chuẩn bị đã xong, vào bếp nấu ngay thôi.',
                            textStyle: styles.baseText,
                            imageUri: Image.resolveAssetSource(require('../img/UCook__4_-removebg-preview.png')).uri
                        }
                    ]}

                />
            </View>
        )
    }
}

export default Onboarding;