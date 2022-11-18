import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'
import { Notification_Styles } from '../../Styles'
import { NotificationImagePost_Action } from '../../Redux_Actions/Dispatch_Actions'
import { useDispatch, useSelector } from 'react-redux'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import { Ionicons } from '@expo/vector-icons'
import { FontS } from '../../Utils/FontSize'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)


const Notification_Comp = (props: any) => {

    const { data, navigation } = props
    const loginUser_id = useSelector((state:any) => state.UserProfile_Store.data.user_id)

    const dispatch = useDispatch();

    async function getPost(post_id: any) {
        var formdata = new FormData();
        formdata.append("method", "get_post");
        formdata.append("post_id", post_id);
        formdata.append("user_id", loginUser_id);
        try {
            const response = await FetchingData_Api("POST", "post", formdata);
            // console.log("response:::", response, loginUser_id);
            if (response.status == 1) {
                dispatch(NotificationImagePost_Action([response.data]));
                navigation.navigate('NotificationSinglePostView_Screen');
            }
        }catch(e:any){
            console.log("Notification Single Post View Error:::",e.message);
        }
    }

    return (
        <View style={Notification_Styles.MainContainer}>
            <View style={Notification_Styles.Container}>
                <View style={Notification_Styles.imageContainer}>
                    {
                        data.sender.photo
                            ? <Image style={Notification_Styles.profileImage}
                                source={{ uri: data.sender.photo }} />
                            : <Ionicons name="person-circle" size={FontS(50)} color="white" />
                    }
                </View>
                <TouchableOpacity
                    onPress={() => {
                        data.slug == 'starting_follow' || data.slug == 'follow_request' || data.slug == 'user_following'
                            ? navigation.navigate('OtherUserProfile_Screen', { user_2: data?.sender?.user_id })
                            : getPost(data.post.post_id);
                    }}
                >

                    <View style={Notification_Styles.textContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={Notification_Styles.text1}>{data.sender.name} </Text>
                            <Text style={Notification_Styles.text2}>{data.notification}</Text>
                        </View>
                        <Text style={Notification_Styles.text3}>{dayjs(data.reg_date).fromNow()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Notification_Comp
