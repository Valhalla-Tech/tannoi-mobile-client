import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/actions/LoginAction';
import { bold } from '../../assets/FontSize';

const MeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.meScreenContainerStyle}>
      <TouchableOpacity style={styles.logoutButtonStyle} onPress={() => dispatch(userLogout())}>
        <Text style={styles.logoutButtonTextStyle}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  meScreenContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  logoutButtonStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: "50%",
    height: "10%",
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#de181f"
  },

  logoutButtonTextStyle: {
    color: "#de181f",
    fontFamily: bold,
    fontSize: 20
  }
});

export default MeScreen;