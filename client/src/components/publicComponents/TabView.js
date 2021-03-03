import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { bold } from '../../assets/FontSize';
import { CalculateHeight } from '../../helper/CalculateSize';

const TabView = ({tabMenus, onPress, tabViewContainerStyle}) => {

    const [canRender, setCanRender] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [usedTabMenus, setUsedTabMenus] = useState(null);

    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        checkAllAttributes();
    },[]);

    const generateID = () => {
        let allList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_';
        let generatedID = '';

        for (let i = 0; i < 6; i++) {
            generatedID += allList[Math.ceil(Math.random() * (allList.length - 1))];
        }
        return generatedID;
    };

    const checkAllAttributes = () => {
        let foundError = false;
        if (!Array.isArray(tabMenus)) {
            console.log('tabMenus must be an array of Object consisted of id, name, and onPress function');
            setErrorList(['tabMenus must be an array of Object consisted of id, name, and onPress function']);
            foundError = true;
        }

        if (!foundError) {
            if (tabMenus.length < 2) {
                console.log('tabMenus must have more than 2 elements');
                setErrorList([...errorList, 'tabMenus must have more than 2 elements']);
                foundError = true;
            }

            for (let i = 0; i < tabMenus.length; i++) {
                if (!tabMenus[i].name) {
                    let object = JSON.stringify(tabMenus[i]);
                    console.log(`tabMenus on index ${i} has no name defined ${object}`);
                    setErrorList([...errorList, `tabMenus on index ${i} has no name defined ${object}`]);
                    foundError = true;
                }

                if (!tabMenus[i].id) {
                    let fakeID = generateID();
                    let idChecker = 1;
                    while (idChecker) {
                        if (tabMenus.filter(el => el.id === fakeID).length) {
                            fakeID = generateID();
                        } else {
                            idChecker = 0;
                        }
                    }
                    tabMenus[i].id = fakeID;
                }
            }
        }

        if (!foundError) {
            setUsedTabMenus(tabMenus);
            setSelectedValue(tabMenus[0].id);
            setCanRender(true);
        }
    };

    const renderTabs = () => {
        return (
        <View style={styles.profileDisplayButtonContainerStyle}>
            {usedTabMenus.map(data => {
                return (
                    <TouchableOpacity key={data.id}
                    style={
                        selectedValue === data.id
                        ? {
                            ...styles.displayButtonStyle,
                            borderBottomWidth: 1,
                            borderBottomColor: '#5152D0',
                        }
                        : styles.displayButtonStyle
                    }
                    onPress={() => {
                        setSelectedValue(data.id);
                        if (onPress) {
                            onPress(data);
                        }
                    }}
                    disabled={selectedValue === data.id}>
                        <Text
                            style={
                            selectedValue === data.id
                                ? { ...styles.displayButtonTextStyle, color: '#5152D0' }
                                : styles.displayButtonTextStyle
                            }>
                            {data.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
        );
    };

    const renderErrors = () => {
        return (
            <View style={{backgroundColor: 'red', padding: 5}}>
                {
                    errorList.map(el => <Text style={{color: 'white'}}>TabView Error: {el}</Text>)
                }
            </View>
        );
    };

    return (
        <>
            {canRender ? renderTabs() : renderErrors()}
        </>
    );
};

const styles = StyleSheet.create({
    displayButtonStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5%',
    },

    displayButtonTextStyle: {
      fontFamily: bold,
      color: '#464D60',
      fontSize: CalculateHeight(2),
    },

    profileDisplayButtonContainerStyle: {
        flexDirection: 'row',
    },
});

export default TabView;
