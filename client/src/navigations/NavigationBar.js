import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, findNodeHandle } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalculateHeight, CalculateWidth } from '../helper/CalculateSize';
import AsyncStorage from '@react-native-community/async-storage';

import AddDiscussionButton from '../components/elements/AddDiscussionButton';
import MenuIcon from '../components/elements/MenuIcon';
import CoachMark from '../components/publicComponents/CoachMark';

//Icons
import HomeIcon from '../assets/homeAssets/homeIcon.svg';
import HomeIconNotActive from '../assets/homeAssets/homeIconNotActive.svg';
import TopicICon from '../assets/topicAssets/topicIcon.svg';
import TopicIconNotActive from '../assets/topicAssets/topicIconNotActive.svg';
import InboxIcon from '../assets/inboxAssets/inboxIcon.svg';
import InboxIconNotActive from '../assets/inboxAssets/inboxIconNotActive.svg';
import MeIcon from '../assets/meAssets/meIcon.svg';
import MeIconNotActive from '../assets/meAssets/meIconNotActive.svg';
import MicrophoneIcon from '../assets/ic_microphone.svg';
import HomeTutorialIcon from '../assets/ic_home.svg';
import MessageIcon from '../assets/ic_message.svg';
import MailIcon from '../assets/ic_mail.svg';
import ProfileIcon from '../assets/ic_profile.svg';
import CoachMarkArrow1 from '../assets/coach_arrow1.svg';
import CoachMarkArrow2 from '../assets/coach_arrow2.svg';
import CoachMarkArrow3 from '../assets/coach_arrow3.svg';
import CoachMarkArrow4 from '../assets/coach_arrow4.svg';

//Screen
import HomeScreen from '../screens/homeScreens/HomeScreen';
import TopicIndexScreen from '../screens/topicScreens/TopicIndexScreen';
import InboxScreen from '../screens/inboxScreen/InboxScreen';
import MeScreen from '../screens/meScreens/MeScreen';
import NewDiscussionScreen from '../screens/topicScreens/NewDiscussionScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = (props) => {
  const { navigation } = props;
  const [tutorial, setTutorial] = useState('');
  const addDiscussionButtonRef = useRef();
  const homeMenuRef = useRef();
  const topicMenuRef = useRef();
  const inboxMenuRef = useRef();
  const meMenuRef = useRef();
  const coachmarkRef = useRef();
  const [addButonProperties, setAddButtonProperties] = useState(null);
  const [coachMarkButtonText, setCoachMarkButtonText] = useState('');
  const [tutorialStep, incrementTutorialStep] = useState(1);
  const [tutorialTitle, setTutorialTitle] = useState('');
  const [tutorialDesc, setTutorialDesc] = useState('');
  const [tutorialIcon, setTutorialIcon] = useState(null);
  const [homeIconLocation, setHomeIconLocation] = useState(null);
  const [topicIconLocation, setTopicIconLocation] = useState(null);
  const [inboxIconLocation, setInboxIconLocation] = useState(null);
  const [meIconLocation, setMeIconLocation] = useState(null);
  const communityButtonProperties = useSelector(state => state.CoachMarkReducer.communityButtonProperties);
  const newDiscussionScreenButton = () => {
    return navigation.navigate('NewDiscussionScreen');
  };

  const triggerTutorial = (step) => {
    if (!tutorial) {
      setTutorial('true');
    }

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

  useEffect(() => {
    getTutorialStatus();
  }, []);

  return (
    <>
    {tutorial && addButonProperties && homeIconLocation && topicIconLocation && inboxIconLocation && meIconLocation && communityButtonProperties ? <CoachMark 
          holeProgression={[addButonProperties, homeIconLocation, topicIconLocation, inboxIconLocation, meIconLocation, communityButtonProperties, ]}
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
          {tutorialStep === 1 ? <CoachMarkArrow1 style={{position: 'absolute', top: addButonProperties.y - 140, left: addButonProperties.x - 90, zIndex: 999}}/> : null}
          {tutorialStep === 2 ? <CoachMarkArrow2 style={{position: 'absolute', top: homeIconLocation.y - 170, left: homeIconLocation.x + 20, zIndex: 999}}/> : null}
          {tutorialStep === 3 ? <CoachMarkArrow2 style={{position: 'absolute', top: topicIconLocation.y - 170, left: topicIconLocation.x + 30, zIndex: 999}}/> : null}
          {tutorialStep === 4 ? <CoachMarkArrow3 style={{position: 'absolute', top: inboxIconLocation.y - 170, left: inboxIconLocation.x - 80, zIndex: 999}}/> : null}
          {tutorialStep === 5 ? <CoachMarkArrow3 style={{position: 'absolute', top: meIconLocation.y - 170, left: meIconLocation.x - 80, zIndex: 999}}/> : null}
          {tutorialStep === 6 ? <CoachMarkArrow4 style={{position: 'absolute', top: communityButtonProperties.y + 50, left: communityButtonProperties.x - 80, zIndex: 999}}/> : null}
        </CoachMark> : null}
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#2B085C',
          paddingVertical: '3%',
        },
        keyboardHidesTabBar: true,
        // ref={tabNavRef}
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <MenuIcon ref={homeMenuRef} onLayout={event => {
              console.log('here?')
              // homeMenuRef.current.measureLayout(tabNavRef.current,(x, y, width, height) => {
              //   console.log('a home', {x, y, width, height})
              // })
              homeMenuRef.current.measure( (fx, fy, width, height, px, py) => {
                console.log('home', {fx, fy, width, height, px, py}, CalculateWidth(100))

                setHomeIconLocation({
                    x: CalculateWidth(1),
                    y: py - 20,
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                  });
              });
            }}>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <HomeIcon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Home</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <HomeIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Home</Text>
                </View>
              )}
            </MenuIcon>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="Topics"
        component={TopicIndexScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <MenuIcon ref={topicMenuRef} onLayout={event => {
              topicMenuRef.current.measure( (fx, fy, width, height, px, py) => {
                console.log('topic', {fx, fy, width, height, px, py})
                setTopicIconLocation({
                    x: CalculateWidth(20),
                    y: py - 20,
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                  });
              });
            }}>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TopicICon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Topics</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TopicIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Topics</Text>
                </View>
              )}
            </MenuIcon>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="new discussion"
        component={NewDiscussionScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <AddDiscussionButton ref={addDiscussionButtonRef} onLayout={e => {
              addDiscussionButtonRef.current.measureInWindow( (x, y, width, height) => {
                // console.log('disc', {fx, fy, width, height, px, py})
                setAddButtonProperties({
                  x: CalculateWidth(39),
                  y,
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                });
              });
            }} onPress={newDiscussionScreenButton} />
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <MenuIcon ref={inboxMenuRef} onLayout={event => {
              inboxMenuRef.current.measure( (fx, fy, width, height, px, py) => {
                console.log('inbox', {fx, fy, width, height, px, py})
                setInboxIconLocation({
                    x: CalculateWidth(60),
                    y: py - 20,
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                  });
              });
            }}>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <InboxIcon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Inbox</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <InboxIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Inbox</Text>
                </View>
              )}
            </MenuIcon>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <MenuIcon ref={meMenuRef} onLayout={event => {
              meMenuRef.current.measure( (fx, fy, width, height, px, py) => {
                console.log('me', {fx, fy, width, height, px, py})
                setMeIconLocation({
                    x: CalculateWidth(80),
                    y: py - 20,
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                  });
              });
            }}>
              {focused ? (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MeIcon />
                  <Text style={{ color: '#FFA530', fontSize: CalculateHeight(1.1) }}>Me</Text>
                </View>
              ) : (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MeIconNotActive />
                  <Text style={{ color: '#FFFFFF', fontSize: CalculateHeight(1.1) }}>Me</Text>
                </View>
              )}
            </MenuIcon>
          ),
          style: {
            color: '#FFFFFF',
          },
        }}
      />
    </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create ({
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
})

export default NavigationBar;
