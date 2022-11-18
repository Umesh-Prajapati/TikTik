import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontS } from '../../../Utils/FontSize';
import { OtherProfile_Styles } from '../../../Styles';
import Spacer_Space from '../../../Utils/Spacer_Space';
import SingleBtn_Comp from '../SingleBtn_Comp';
import Follow_Button_Comp from './Follow_Button_Comp';
import { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//     loginUser_id: undefined,
//     EditProfile_Screen: undefined
// };

// type authScreenProp = StackNavigationProp<RootStackParamList, 'loginUser_id'>;

const UserProfile_Header_Comp = (props: any) => {

    const { loginUser_id, user_2,
        callGetProfile, data,
        totalLikes, totalPost,
        touchable,
        btnName
    } = props

    const navigation = useNavigation<any>();
    // const navigation = useNavigation<authScreenProp>();

    // console.log("callingggg");
    function ReturnBtnComp() {
        if (loginUser_id == user_2) {
            return <View style={{ alignSelf: 'center', flexDirection: 'row', marginVertical: "5%", }}>
                <SingleBtn_Comp btnName='Edit Profile' onSubmit={() => navigation.navigate('EditProfile_Screen',{loginUser_id})} />
                {/* <SingleBtn_Comp btnName='Edit Profile' onSubmit={() => navigation.navigate('EditProfile_Screen',{loginUser_id})} /> */}
            </View>
        } else {
            return <Follow_Button_Comp
                btnName={btnName}
                user_2={user_2}
                loginUser_id={loginUser_id}
                ProfileType_user_2={data?.settings?.profile}
                user_1_follow_request={data?.user_1_follow_request}
                user_2_follow_request={data?.user_2_follow_request}
                onSubmit={() => callGetProfile()}
            />
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Spacer_Space>
                <View style={OtherProfile_Styles.Container}>
                    <View style={OtherProfile_Styles.profileDetailContainer}>
                        {data?.photo
                            ? <Image source={{ uri: data?.photo }} style={OtherProfile_Styles.profileImage} />
                            : <Ionicons name="person-circle" size={FontS(70)} color="black" />}
                        <View style={OtherProfile_Styles.txtContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: FontS(18), fontWeight: '600' }}>{data.name}</Text>
                                <View style={[OtherProfile_Styles.online, { backgroundColor: data?.settings?.activity == 1 ? 'green' : 'grey' }]} /></View>
                            <Text style={{ fontSize: FontS(12) }}>ID : {data.email}</Text>
                        </View>
                    </View>
                    <View style={OtherProfile_Styles.buttonsContainer}>
                        {
                            ReturnBtnComp()
                        }
                    </View>
                    <View style={OtherProfile_Styles.secondTxtContainer}>
                        <TouchableWithoutFeedback onPress={() => {
                            if (!touchable) return
                            navigation?.push('FollowersFollowing_Screen', {
                                initialRouteName: 'Followers',
                                loginUser_id,
                                user_2,
                            })
                        }}>
                            <View style={OtherProfile_Styles.txtCenter}>
                                <Text style={OtherProfile_Styles.totalTxt}>{data.total_followers || 0}</Text>
                                <Text style={OtherProfile_Styles.titleTxt}>Followers</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {
                            if (!touchable) return
                            navigation?.push('FollowersFollowing_Screen', {
                                initialRouteName: 'Following',
                                loginUser_id,
                                user_2,
                            })
                        }}>
                            <View style={OtherProfile_Styles.txtCenter}>
                                <Text style={OtherProfile_Styles.totalTxt}>{data.total_followings || 0}</Text>
                                <Text style={OtherProfile_Styles.titleTxt}>Following</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={OtherProfile_Styles.txtCenter}>
                            <Text style={OtherProfile_Styles.totalTxt}>{totalLikes}</Text>
                            <Text style={OtherProfile_Styles.titleTxt}>Likes</Text>
                        </View>
                        <View style={OtherProfile_Styles.txtCenter}>
                            <Text style={OtherProfile_Styles.totalTxt}>{totalPost}</Text>
                            <Text style={OtherProfile_Styles.titleTxt}>Post</Text>
                        </View>
                    </View>
                </View>
            </Spacer_Space>
        </View>
    )
}

export default UserProfile_Header_Comp