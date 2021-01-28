import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { bold } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';
import {useDispatch} from 'react-redux';
import {clearData} from '../../store/actions/CreateCommunityAction';

//Components
import BackButton from '../publicComponents/BackButton';
import Header from '../publicComponents/Header';
import CloseButton from '../publicComponents/CloseButton';

const CreateCommunityHeader = (props) => {
  const {isCancelButton = true, isCloseButton, navigation} = props;

  const dispatch = useDispatch();

  const HeaderContent = () => {
    return (
      <>
        {
          isCloseButton ? (
            <CloseButton
              closeFunction={() => {
                navigation.goBack();
                dispatch(clearData());
              }}
            />
          ) : (
            <BackButton
              styleOption={{
                marginTop: 0,
                marginBottom: 0,
              }}
              navigation={navigation}
            />
          )
        }
        {isCancelButton && (
          <TouchableOpacity onPress={() => {
            navigation.navigate('CommunitiesScreen');
            dispatch(clearData());
          }}>
            <Text style={styles.cancelButtonTextStyle}>Cancel</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return <Header child={HeaderContent} customStyle={styles.headerStyle} />;
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: null,
    paddingTop: '15%',
    paddingHorizontal: '5%',
  },

  cancelButtonTextStyle: {
    color: '#73798C',
    fontFamily: bold,
    fontSize: CalculateHeight(2)
  }
});

export default CreateCommunityHeader;
