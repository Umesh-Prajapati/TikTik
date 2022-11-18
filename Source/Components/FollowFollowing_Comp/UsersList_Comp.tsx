import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontS } from '../../Utils/FontSize'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Search_Styles } from '../../Styles' 
import { FetchingData_Api } from '../../Api/FetchingData_Api'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const UsersList_Comp = (props:any) => {

    const navigation = useNavigation();

    const { item, loginUser_id, user_2, loginUser_ProfileType, user_2_ProfileType, onSubmit } = props
    const [btnName, setBtnName] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setPrams(item?.user_1_follow_request, item?.user_2_follow_request)
    }, [item])

    function setPrams(user1FollowReq : any, user2FollowReq : any) {
        if (loginUser_ProfileType == 1 && user_2_ProfileType == 0) {
            // console.log("first Conditioin:-=-=-=-=::", user1FollowReq, "||", user2FollowReq);
            if (user1FollowReq == '' && user2FollowReq == '') setBtnName('Follow');
            else if (user1FollowReq == null && user2FollowReq == null) setBtnName('Follow');
            else if (user1FollowReq == 'accepted' && user2FollowReq == 'accepted') setBtnName('UnFollow');
            else if (user1FollowReq == 'pending' && user2FollowReq == 'accepted') setBtnName('Requested');
            else if (user1FollowReq == 'accepted' && user2FollowReq == '') setBtnName('UnFollow');
            else if (user1FollowReq == '' && user2FollowReq == 'accepted') setBtnName('FollowBack');
            else if (user1FollowReq == '' && user2FollowReq == 'pending') setBtnName('Accept/Cancel'); //not api
            else if (user1FollowReq == 'pending' && user2FollowReq == '') setBtnName('Requested');
        } else {
            // console.log("Second Conditioin:-=-=-=-=::", user1FollowReq, "||", user2FollowReq);
            if (user1FollowReq == '' && user2FollowReq == '') setBtnName('Follow');
            else if (user1FollowReq == 'accepted' && user2FollowReq == 'accepted') setBtnName('UnFollow');
            else if (user1FollowReq == 'accepted' && user2FollowReq == 'pending') setBtnName('Requested');
            else if (user1FollowReq == 'pending' && user2FollowReq == 'accepted') setBtnName('Requested');
            else if (user1FollowReq == '' && user2FollowReq == 'accepted') setBtnName('FollowBack');
            else if (user1FollowReq == 'accepted' && user2FollowReq == '') setBtnName('UnFollow');
            else if (user1FollowReq == 'pending' && user2FollowReq == '') setBtnName('Requested');
            else if (user1FollowReq == '' && user2FollowReq == 'pending') setBtnName('Accept/Cancel'); //not api
        }
    }
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    //---------------------------------------------------------------------------1
    async function doFollow() {
        setLoading(true)
        var formdata = new FormData();
        formdata.append("method", "do_follow");
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);

        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp?.status == 1) {
            onSubmit();
        }
        console.log("Do Follow...:::", resp);
        setLoading(false)
    }
    //---------------------------------------------------------------------------2
    async function unFollow() {
        var formdata = new FormData();
        formdata.append("method", "unfollow");
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);

        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp && resp?.status == 1) {
            onSubmit();
        }
        console.log("UnFollow...:::", resp);
    }
    //---------------------------------------------------------------------------3
    async function cancelFollowRequest() {
        setLoading(true)
        var formdata = new FormData();
        formdata.append("method", "cancel_follow_request");
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);

        // console.log(".,.,.,.,.,.,.,,-=-=-", formdata);

        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp && resp?.status == 1) {
            onSubmit();
        }
        console.log("Cancel Follow request...:::", resp);
        setLoading(false)
    }
    //---------------------------------------------------------------------------4
    async function rejectFollowRequest() {
        var formdata = new FormData();
        formdata.append("method", "reject_follow_request");
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);

        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp && resp?.status == 1) {
            onSubmit();
        }
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
        console.log("Reject Req...:::", resp);
        console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
        onSubmit()
    }
    //---------------------------------------------------------------------------5
    async function acceptFollowRequest() {
        var formdata = new FormData();
        formdata.append("method", "accept_follow_request");
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);
        try {
            const resp = await FetchingData_Api("POST", 'profile', formdata);
            console.log("-=-=-=-=-=-=-=->>>", resp);
            if (resp?.status === 1) {
                onSubmit();
            }
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
            console.log("accept req...:::", resp);
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
        } catch (e:any) {
            console.log("error on accept Request :::", e.message);
        }
    }

    function callApi() {
        // if (btnName == 'Accept/Cancel') { Alert.alert("Reject/Accept") }
        // else {
        if (btnName == 'Follow') doFollow()
        else if (btnName == 'UnFollow') unFollow()
        else if (btnName == 'FollowBack') doFollow()
        else if (btnName == 'Requested') cancelFollowRequest()
        // }
    }
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    function btnComp() {
        if (btnName == 'Accept/Cancel') {
            return <>
                <TouchableOpacity onPress={() => { acceptFollowRequest() }} style={Search_Styles.ButtonContainer}>
                    <View>
                        {loading
                            ? < ActivityIndicator size={'small'} color='white' />
                            : <Text style={Search_Styles.btnName}>Accept</Text>
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { rejectFollowRequest() }} style={Search_Styles.ButtonContainer}>
                    <View>
                        {loading
                            ? < ActivityIndicator size={'small'} color='white' />
                            : <Text style={Search_Styles.btnName}>Reject</Text>
                        }
                    </View>
                </TouchableOpacity>
            </>
        }
        return <TouchableOpacity onPress={() => { callApi() }} style={Search_Styles.ButtonContainer}>
            <View>
                {loading
                    ? < ActivityIndicator size={'small'} color='white' />
                    : <Text style={Search_Styles.btnName}>{btnName}</Text>
                }
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={Search_Styles.MainContainer}>
            <View style={Search_Styles.VerticalView}>
                <TouchableWithoutFeedback onPress={() => navigation.push("OtherUserProfile_Screen", { user_2: item.user_id })}>
                    <View style={Search_Styles.InnerVerticalContainer}>
                        <View>
                            {item?.photo
                                ? <Image source={{ uri: item?.photo }} style={Search_Styles.profileImg} />
                                : <Ionicons name="person-circle" size={FontS(50)} color="black" />
                            }
                        </View>
                        <View style={Search_Styles.userNameView}>
                            <Text style={{ fontSize: FontS(16), color: "rgb(89,88,89)" }}>
                                {item?.name}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {loginUser_id !== item?.user_id
                ? btnComp()
                : null
            }
        </View >
    )
}

export default UsersList_Comp