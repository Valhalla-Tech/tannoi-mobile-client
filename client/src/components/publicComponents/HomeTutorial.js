
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import CoachMark from './CoachMark';
import { CalculateWidth } from '../../helper/CalculateSize';
import AsyncStorage from '@react-native-community/async-storage';

import MicrophoneIcon from '../../assets/ic_microphone.svg';
import HomeTutorialIcon from '../../assets/ic_home.svg';
import MessageIcon from '../../assets/ic_message.svg';
import MailIcon from '../../assets/ic_mail.svg';
import ProfileIcon from '../../assets/ic_profile.svg';
import CoachMarkArrow1 from '../../assets/coach_arrow1.svg';
import CoachMarkArrow2 from '../../assets/coach_arrow2.svg';
import CoachMarkArrow3 from '../../assets/coach_arrow3.svg';
import CoachMarkArrow4 from '../../assets/coach_arrow4.svg';

const HomeTutorial = () => {

    const coachmarkRef = useRef();
    const [tutorial, setTutorial] = useState('');
    const [coachMarkButtonText, setCoachMarkButtonText] = useState('');
    const [tutorialStep, incrementTutorialStep] = useState(1);
    const [tutorialTitle, setTutorialTitle] = useState('');
    const [tutorialDesc, setTutorialDesc] = useState('');
    const [tutorialIcon, setTutorialIcon] = useState(null);
    const communityButtonProperties = useSelector(state => state.CoachMarkReducer.communityButtonProperties);
    const addNewDiscussionButtonProperties = useSelector(state => state.CoachMarkReducer.addNewDiscussionButtonProperties);
    const homeButtonProperties = useSelector(state => state.CoachMarkReducer.homeButtonProperties);
    const topicButtonProperties = useSelector(state => state.CoachMarkReducer.topicButtonProperties);
    const inboxButtonProperties = useSelector(state => state.CoachMarkReducer.inboxButtonProperties);
    const meButtonProperties = useSelector(state => state.CoachMarkReducer.meButtonProperties);
    const testState = useSelector(state => state.CoachMarkReducer)

    useEffect(() => {
        getTutorialStatus();
        // triggerTutorial(tutorialStep);
    }, []);

    useEffect(() => {
        console.log('TEST', {testState})
    }, [testState])

    const triggerTutorial = (step) => {
        if (!tutorial) {
        setTutorial('true');
        }
        console.log('here?????')
        if (step === 1) {
        setTutorialIcon(<MicrophoneIcon/>);
        setCoachMarkButtonText('Got it');
        setTutorialTitle('Post a discussion by clicking here');
        setTutorialDesc('What do you want to talk about? Start a discussion using only your voice!');
        } else if (step === 2) {
        setTutorialIcon(<HomeTutorialIcon/>);
        setCoachMarkButtonText('Next');
        setTutorialTitle('This is the home screen');
        setTutorialDesc('All public discussions in the TannOi community will appear here.');
        } else if (step === 3) {
        setTutorialIcon(<MessageIcon/>);
        setCoachMarkButtonText('Next');
        setTutorialTitle('This is the topics screen');
        setTutorialDesc('Browse and follow your favorite topics here - from music, sports to news.');
        } else if (step === 4) {
        setTutorialIcon(<MailIcon/>);
        setCoachMarkButtonText('Next');
        setTutorialTitle('This is the Inbox - stay updated!');
        setTutorialDesc('TannOi is social! All your activity and notifications from people you follow is here.');
        } else if (step === 5) {
        setTutorialIcon(<ProfileIcon/>);
        setCoachMarkButtonText('Next');
        setTutorialTitle('This is your TannOi User Profile');
        setTutorialDesc('Personalize your public user profile here!');
        } else if (step === 6) {
        setTutorialIcon(<MicrophoneIcon/>);
        setCoachMarkButtonText('Got it!');
        setTutorialTitle('Browse your communities');
        setTutorialDesc('Personalize your public user profile here!');
        } else if (step > 6) {
        setTutorial('');
        }
    };

    const getTutorialStatus = async () => {
        let tutorialStatus = await AsyncStorage.getItem('tutorial');
        if (!tutorialStatus) {
          triggerTutorial(tutorialStep);
          AsyncStorage.setItem('tutorial', 'true');
        }
      };

      const nextStep = () => {
        coachmarkRef.current.nextHole();
        triggerTutorial(tutorialStep + 1);
        incrementTutorialStep(tutorialStep + 1);
    };

    return (
        <>
        {tutorial && addNewDiscussionButtonProperties && homeButtonProperties && topicButtonProperties && inboxButtonProperties && meButtonProperties && communityButtonProperties ?
        <CoachMark 
          holeProgression={[ addNewDiscussionButtonProperties, homeButtonProperties, topicButtonProperties, inboxButtonProperties, meButtonProperties, communityButtonProperties ]}
          ref={coachmarkRef}
        >
          <View style={styles.CoachMarkModal}>
            <View style={styles.tutorialIcon}>
              {tutorialIcon}
            </View>
            <View style={styles.tutorialTextWrapper}>
              <Text style={styles.tutorialTitle}>{tutorialTitle}</Text>
              <Text style={styles.tutorialDesc}>{tutorialDesc}</Text>
            </View>
            <TouchableOpacity onPress={() => nextStep()} style={styles.tutorialNextBtn}><Text style={{color: '#7817FF'}}>{coachMarkButtonText}</Text></TouchableOpacity>
          </View>
          {tutorialStep === 1 ? <CoachMarkArrow1 style={{position: 'absolute', top: addNewDiscussionButtonProperties.y - 140, left: addNewDiscussionButtonProperties.x - 90, zIndex: 999}}/> : null}
          {tutorialStep === 2 ? <CoachMarkArrow2 style={{position: 'absolute', top: homeButtonProperties.y - 170, left: homeButtonProperties.x + 20, zIndex: 999}}/> : null}
          {tutorialStep === 3 ? <CoachMarkArrow2 style={{position: 'absolute', top: topicButtonProperties.y - 170, left: topicButtonProperties.x + 30, zIndex: 999}}/> : null}
          {tutorialStep === 4 ? <CoachMarkArrow3 style={{position: 'absolute', top: inboxButtonProperties.y - 170, left: inboxButtonProperties.x - 80, zIndex: 999}}/> : null}
          {tutorialStep === 5 ? <CoachMarkArrow3 style={{position: 'absolute', top: meButtonProperties.y - 170, left: meButtonProperties.x - 80, zIndex: 999}}/> : null}
          {tutorialStep === 6 ? <CoachMarkArrow4 style={{position: 'absolute', top: communityButtonProperties.y + 50, left: communityButtonProperties.x - 80, zIndex: 999}}/> : null}
        </CoachMark> : null}
        </>
    );
};

const styles = StyleSheet.create({
    CoachMarkModal: {
      zIndex: 9999,
      backgroundColor: 'white',
      width: CalculateWidth(80),
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    tutorialIcon: {
      width: '90%',
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: 20,
      marginBottom: 20,
    },
    tutorialTextWrapper: {
      width: '90%',
      marginLeft: '10%',
      display: 'flex',
    },
    tutorialTitle: {
      fontSize: 28,
      color: '#464D60',
      fontWeight: 'bold',
      marginBottom: 15
    },
    tutorialDesc: {
      fontSize: 18,
      color: '#464D60',
      marginBottom: 15,
    },
    tutorialNextBtn: {
      marginLeft: '10%',
      width: '90%',
      height: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#7817FF',
      borderRadius: 30,
      marginBottom: 15,
    },
});

export default HomeTutorial;

