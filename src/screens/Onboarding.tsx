import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnboardFlow } from 'react-native-onboard';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import AppLoading from 'expo-app-loading';


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
                    type='fullscreen'
                    showDismissButton={!!'false'}
                    onDone={handleNavigate}
                    primaryButtonTextStyle={[styles.baseText]}
                    primaryButtonStyle={styles.primaryButton}
                    titleStyle={styles.baseText}
                    subtitleStyle={styles.baseText}
                    pages={[
                        {
                            id: '0',
                            title: 'Nhận dạng nguyên liệu',
                            subtitle: 'Tôi sẽ gợi ý các món ăn dựa trên nguyên liệu bạn yêu cầu.',
                            imageUri: Image.resolveAssetSource(require('../img/UCook__2_-removebg-preview.png')).uri,
                            primaryButtonTitle: 'Tiếp tục'
                        },
                        {
                            id: '1',
                            title: 'Lựa chọn món ăn',
                            subtitle: 'Chọn một món từ danh sách các món ăn để xem chi tiết cách nấu.',
                            imageUri: Image.resolveAssetSource(require('../img/UCook__3_-removebg-preview.png')).uri,
                            primaryButtonTitle: 'Tiếp tục'
                        },
                        {
                            id: '2',
                            title: 'Sẵn sàng vào bếp',
                            subtitle: 'Các bước chuẩn bị đã hoàn tất, vào bếp nấu ngay thôi.',
                            imageUri: Image.resolveAssetSource(require('../img/UCook__4_-removebg-preview.png')).uri,
                            primaryButtonTitle: 'Bắt đầu'
                        }
                    ]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    baseText: {
        fontFamily: 'VarelaRound_400Regular',
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#DDAD68'
    },
    primaryText: {
        color: 'black'
    }
});

export default Onboarding;