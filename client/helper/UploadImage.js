import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

export const UploadImage = (setImageFile) => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: false
  }).then(image => {
    let divider = 1;
    if (image.size > 300000) {
      divider = image.size / 300000;
    }
    ImageResizer.createResizedImage(
      image.path,
      image.width / divider,
      image.height / divider,
      'JPEG',
      100,
      0,
      null,
    ).then(resp => {
      ImagePicker.openCropper({
        path: resp.uri,
      }).then(image => {
        setImageFile(image.path);
      })
    })
  })
  .catch(error => {
    console.log(error)
  })
};