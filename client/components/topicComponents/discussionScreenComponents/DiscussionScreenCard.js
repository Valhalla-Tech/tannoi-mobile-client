import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

//Profile picture example
import ProfilePictureExample from '../../../assets/publicAssets/bigProfilePicture.png';

const DiscussionScreenCard = () => {
  return (
    <View style={styles.discussionScreenCardContainerStyle}>
      <View style={styles.profileAndMenuContainerStyle}>
        <View style={styles.profileInfoContainerStyle}>
          <View style={styles.profileContainerStyle}>
            <Image style={styles.profileImageStyle} />
            <Text>Richard Hendricks</Text>
          </View>
          <Text style={styles.postTimeStyle}></Text>
        </View>
        <View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  discussionScreenCardContainerStyle: {
    backgroundColor: "#FFFFFF",
    margin: 8,
    borderRadius: 8,
    padding: 16
  },

  profileAndMenuContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  profileContainerStyle: {
    flexDirection: "row"
  },

  profileImageStyle: {

  },

  postTimeStyle: {

  }
});

export default DiscussionScreenCard;