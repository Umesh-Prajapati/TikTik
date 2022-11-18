import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Home_screen from '../Screens/Home/Index';

import Search_screen from '../Screens/Search/Index';
import Notification_Screen from '../Screens/Notification/Index';
import MyProfile_Screen from '../Screens/MyProfile/Index';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export const BottomTabNavigator = () => {

  const windowHeight = Dimensions.get('window').height;
  
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home-outline'
        break;
      case 'Search':
        icon = 'search-outline';
        break;
      case 'Notification':
        icon = 'notifications-outline';
        break;
      case 'MyProfile':
        icon = 'person-outline';
        break;
      return ; 
    }

    return (  
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? `#5eafff` : 'gray'}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      screenOptions={{ headerShown: false }}
      strokeWidth={0.5}
      height={windowHeight / 14}
      circleWidth={windowHeight / 16}
      bgColor="white"
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircle}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            onPress={() => navigate('AddPost_Screen')}>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      )}
    tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={Home_screen}
      />
      <CurvedBottomBar.Screen
        name="Search"
        position="LEFT"
        component={Search_screen}
      />
      <CurvedBottomBar.Screen
        name="Notification"
        component={Notification_Screen}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="MyProfile"
        component={MyProfile_Screen}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
};

export const styles = StyleSheet.create({

  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  img: {
    width: 30,
    height: 30,
  },
});