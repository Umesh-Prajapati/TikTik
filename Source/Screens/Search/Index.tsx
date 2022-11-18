import { View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import FollowFollowing_Comp from '../../Components/Search_Comp/FollowFollowing_Comp';
import SimpleHeader_Comp from '../../Components/GlobalComp/SimpleHeader_Comp';
import Images_Screen from './Images_Screen';

const Index = ({ navigation }: any) => {

  useEffect(() => {
    navigation.setOptions({});
  }, []);

  const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id);
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{ height: '100%', flex: 1 }}>

      <SimpleHeader_Comp headerName='Search' />

      <Tab.Navigator initialRouteName='Users' backBehavior='order'>
        <Tab.Screen name="Users" component={FollowFollowing_Comp} key={1}
          initialParams={{ loginUser_id, user_2: loginUser_id, ApiType: 'get_followers' }} />
        <Tab.Screen name="Images" component={Images_Screen} key={2}
          initialParams={{ navigation }} />
      </Tab.Navigator>
    </View>
  )
}

export default Index