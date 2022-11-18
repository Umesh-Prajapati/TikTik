import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile_Action, User_Login_Action } from '../Redux_Actions/Dispatch_Actions';
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import Login_Screen from '../Screens/AuthenticationFlow/Login_Screen';
import SignUp_Screen from '../Screens/AuthenticationFlow/SignUp_Screen';
import ForgetPassword_Screen from '../Screens/AuthenticationFlow/ForgetPassword_Screen';
import OtpVerify_Screen from '../Screens/AuthenticationFlow/OtpVerify_Screen';
import MakeNewPassword_Screen from '../Screens/AuthenticationFlow/MakeNewPassword_Screen';
import PasswordChangedDone_Screen from '../Screens/AuthenticationFlow/PasswordChangedDone_Screen';
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=---=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { BottomTabNavigator } from './BottomTabNavigator';
import AddPost_Screen from '../Screens/Add_Edit_Post/AddPost_Screen';
import EditPost_Screen from '../Screens/Add_Edit_Post/EditPost_Screen';
import Comment_Screen from '../Screens/Comment/Comment_Screen';
import FollowingRequest_Screen from '../Screens/Notification/FollowingRequest_Screen';
import OtherUserProfile_Screen from '../Screens/OtherUserProfile_Screen/OtherUserProfile_Screen';
import EditProfile_Screen from '../Screens/EditProfile/EditProfile_Screen';
import FollowersFollowing_Screen from '../Screens/FollowFollowing/FollowersFollowing_Screen';
import MyProfileSinglePostView_Screen from '../Screens/SinglePostView/MyProfileSinglePostView_Screen';
import SearchSinglePostView_Screen from '../Screens/SinglePostView/SearchSinglePostView_Screen';
import ProfileSettings_Screen from '../Screens/ProfileSettings/ProfileSettings_Screen';
import NotificationSinglePostView_Screen from '../Screens/SinglePostView/NotificationSinglePostView_Screen';
import SplaceScreen from '../Screens/SplaceScreen/SplaceScreen';

import Svg, { Path, SvgUri } from 'react-native-svg';

// import Mango from '../assets/Svgs/mago.svg'


const Stack = createStackNavigator();

const index = () => {

    useEffect(() => {
        preLoad();
    }, []);
    const dispatch = useDispatch();

    const [splaceLoading, setSplaceLoading] = useState(true)

    const isLogin = useSelector((state: any) => state.UserLoginState_Store)
    console.log("isLoginState-=-=>", isLogin);

    async function preLoad() {
        try {
            const jsonValue = await AsyncStorage.getItem("@userDetails");
            const response = JSON.parse(jsonValue!!);
            console.log("LoginIdd:::", response.data.user_id);
            if (response) {
                dispatch(UserProfile_Action(response));
                response?.data?.user_id ? dispatch(User_Login_Action(true)) : null;
                setTimeout(() => { setSplaceLoading(false) }, 800)
            }
        } catch (e: any) {
            setTimeout(() => { setSplaceLoading(false) }, 800)
            console.log("startupError::: ", e.message);
        }
        setTimeout(() => { setSplaceLoading(false) }, 800)
    }

    if (splaceLoading) {
        return <SplaceScreen />
    }

    return (
        <Stack.Navigator screenOptions={{ animationEnabled: false, cardStyle: {} }} >
            {!isLogin ?
                <>
                    <Stack.Screen name='LoginScreen' component={Login_Screen} options={{ headerShown: false, }} />
                    <Stack.Screen name='SignUpScreen' component={SignUp_Screen} />
                    <Stack.Screen name='ForgetPassword_Screen' component={ForgetPassword_Screen} options={{ title: 'Forgot Password' }} />
                    <Stack.Screen name='OtpVerify_Screen' component={OtpVerify_Screen} options={{ title: 'Verify Your Otp' }} />
                    <Stack.Screen name='MakeNewPassword_Screen' component={MakeNewPassword_Screen} options={{ title: 'Reset Password' }} />
                    <Stack.Screen name='ConfirmPassword' component={PasswordChangedDone_Screen} options={{ title: 'Password Changed' }} />
                </>
                : <>
                    <Stack.Screen name='Back' component={BottomTabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name='AddPost_Screen' component={AddPost_Screen} options={{
                        title: "Add New Post", 
                        /* headerBackground: () => (
                            <SvgUri width="200" height="200" uri={"../assets/Svgs/mago.svg"} />
                            // <Image
                            //     style={[{zIndex:20}, StyleSheet.absoluteFill,]}
                            //     source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
                            // />
                        ), */
                    }} />
                    <Stack.Screen name='EditPost_Screen' component={EditPost_Screen} options={{ title: "Edit Post" }} />
                    <Stack.Screen name='Comment_Screen' component={Comment_Screen} options={{ title: "Comments" }} />
                    <Stack.Screen name='FollowingRequest_Screen' component={FollowingRequest_Screen} options={{ title: "Users Requests" }} />
                    <Stack.Screen name='OtherUserProfile_Screen' component={OtherUserProfile_Screen} options={{ title: "Profile" }} />
                    <Stack.Screen name='EditProfile_Screen' component={EditProfile_Screen} options={{ title: "Edit Profile" }} />
                    <Stack.Screen name='FollowersFollowing_Screen' component={FollowersFollowing_Screen} options={{ title: "Users List" }} />

                    <Stack.Screen name='MyProfileSinglePostView_Screen' component={MyProfileSinglePostView_Screen} options={{ title: "PostDetails" }} />
                    <Stack.Screen name='SearchSinglePostView_Screen' component={SearchSinglePostView_Screen} options={{ title: "PostDetails" }} />
                    <Stack.Screen name='NotificationSinglePostView_Screen' component={NotificationSinglePostView_Screen} options={{ title: "PostDetails" }} />

                    <Stack.Screen name='ProfileSettings_Screen' component={ProfileSettings_Screen} options={{ title: "Profile Settings" }} />
                </>
            }
        </Stack.Navigator>
    );
}

export default index