import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';

const MenuIcon = forwardRef((props, ref) => {
    const { children, onLayout } = props;

    return (<View ref={ref} onLayout={e => onLayout(e)}>
            {children}
        </View>);
});

export default MenuIcon;
