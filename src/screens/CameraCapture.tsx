import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export const openCamera = async (): Promise<string | null> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Yêu cầu cấp quyền',
      'Ứng dụng cần được cấp quyền để sử dụng.\nChọn "MỞ CÀI ĐẶT -> Quyền -> Máy ảnh" ',
      [
        {
          text: 'Từ chối',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Mở cài đặt',
          onPress: () => Linking.openSettings()
        },
      ],
      { cancelable: false },
    );
    return null;
  }

  console.log('>>>>', status);
  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      Alert.alert(
        'Chú ý',
        'Ảnh chưa được lưu. Hãy lưu ảnh sau khi chụp để ứng dụng bắt đầu tìm nguyên liệu.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK')
          },
        ],
        { cancelable: false },
      );
      return null;
    }

    return result.assets[0].uri;
  } catch (e) {
    Alert.alert(
      'Yêu cầu cấp quyền',
      'Ứng dụng cần được cấp quyền để sử dụng.\nChọn "MỞ CÀI ĐẶT -> Quyền -> Tệp và nội dung nghe nhìn" ',
      [
        {
          text: 'Từ chối',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Mở cài đặt',
          onPress: () => Linking.openSettings()
        },
      ],
      { cancelable: false },
    );
    return null;
  }
};