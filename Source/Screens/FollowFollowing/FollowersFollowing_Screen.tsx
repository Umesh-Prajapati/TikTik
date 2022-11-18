import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowFollowing_Comp from './FollowFollowing_Comp';

const FollowersFollowing_Screen = ({ route }: any) => {

    const { initialRouteName, loginUser_id, user_2 } = route.params

    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName={initialRouteName}
        >
            <Tab.Screen name="Followers" component={FollowFollowing_Comp} key={1}
                initialParams={{ loginUser_id, user_2, ApiType: 'get_followers' }} />
            <Tab.Screen name="Following" component={FollowFollowing_Comp} key={2}
                initialParams={{ loginUser_id, user_2, ApiType: 'get_followings' }} />
        </Tab.Navigator>
    );
}

export default FollowersFollowing_Screen