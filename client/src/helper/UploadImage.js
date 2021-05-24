import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

export const UploadImage = (setImageFile, setIsLoading) => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: false,
  })
    .then((image) => {
      ImagePicker.openCropper({
        path: image.path,
        width: 300,
        height: 400,
      }).then((image) => {
        let divider = 1;
        if (image.size > 400000) {
          divider = image.size / 400000;
        }
        ImageResizer.createResizedImage(
          image.path,
          image.width / divider,
          image.height / divider,
          'JPEG',
          100,
          0,
          null,
        ).then((resp) => {
          setImageFile(resp.uri);
        });
      });
    })
    .catch((error) => {
      if (error.message === 'User cancelled image selection') {
        // setIsLoading(false);
      }
    });
};
