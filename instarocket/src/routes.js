import React from 'react';
import { createAppContainer, createStackNavigator, HeaderBackButton } from 'react-navigation';
import { Image } from 'react-native';

import logo from './assets/logo.png';
import Feed from './pages/Feed';
import New from './pages/New';

export default createAppContainer(
    createStackNavigator({
        Feed,
        New,
    }, {
        defaultNavigationOptions: {
            headerTitle: (<Image source={logo} style={{ marginHorizontal: 20 }}/>),
            HeaderBackTitle: null,
            headerTintColor: '#000'
        },
        mode: 'modal'
    })
)