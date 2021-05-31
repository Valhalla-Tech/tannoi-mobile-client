
import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RNHole, RNHoleView, IRNHoleViewAnimation } from 'react-native-hole-view';

const CoachMark = forwardRef(({
    holeProgression = [{x: 150, y: 390, width: 120, height: 120, borderRadius: 60}, {x: 150, y: 40, width: 120, height: 120, borderRadius: 60}],
    children,
}, ref) => {

    const [holes, setHoles] = useState([]);
    const [position, setPosition] = useState(0);

    const nextHole = () => {
        if (holeProgression[position + 1]) {
            setPosition(position + 1);
            setHoles([holeProgression[position + 1]]);
        }
    };

    const previousHole = () => {
        if (holeProgression[position - 1]) {
            setPosition(position - 1);
            setHoles([holeProgression[position - 1]]);
        }
    };

    useImperativeHandle(ref, () => ({

        nextHole() {
            nextHole();
        },
        previousHole() {
            previousHole();
        },
    }));

    useEffect(() => {
        setHoles([holeProgression[position]]);
    }, []);

    return (
        <>
        <RNHoleView
        style={styles.coachMarkStyle}
        holes={holes} />
        <View
        style={styles.childrenWrapperStyle}>
            {children}
        </View>
        <RNHoleView
        style={styles.invisibleOverlayStyle}
         />
        </>
    );
});

const styles = StyleSheet.create({
    childrenWrapperStyle: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 99999,
    },
    coachMarkStyle: {
        width:'100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: .7,
        position: 'absolute',
        zIndex: 9999,
    },
    invisibleOverlayStyle: {
        width:'100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0,
        position: 'absolute',
        zIndex: 9999,
    },
});

export default CoachMark
