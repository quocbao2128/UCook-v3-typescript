import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnboardFlow } from 'react-native-onboard';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
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
        Nunito_400Regular,
        Nunito_600SemiBold
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
                    subtitleStyle={styles.subtitle}
                    pages={[
                        {
                            id: '0',
                            title: 'Nhận dạng nguyên liệu',
                            subtitle: 'Ứng dụng sẽ gợi ý các món ăn dựa trên nguyên liệu bạn yêu cầu.',
                            imageUri: Image.resolveAssetSource(require('../img/UCook__2.png')).uri,
                            primaryButtonTitle: 'TIẾP TỤC'
                        },
                        {
                            id: '1',
                            title: 'Lựa chọn món ăn',
                            subtitle: 'Chọn một món từ danh sách các món ăn để xem chi tiết cách nấu.',
                            imageUri: Image.resolveAssetSource(require('../img/UCook__3.png')).uri,
                            primaryButtonTitle: 'TIẾP TỤC'
                        },
                        {
                            id: '2',
                            title: 'Sẵn sàng vào bếp',
                            subtitle: 'Các bước chuẩn bị đã hoàn tất, vào bếp nấu ngay thôi.',
                            imageUri: Image.resolveAssetSource(require('../img/UCook__4.png')).uri,
                            primaryButtonTitle: 'BẮT ĐẦU'
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
        fontFamily: 'Nunito_600SemiBold',
        fontWeight: '500',
    },
    primaryButton: {
        backgroundColor: '#D08D2F'
    },
    primaryText: {
        color: 'black'
    },
    subtitle: {
        fontFamily: 'Nunito_400Regular'
    }
});

export default Onboarding;