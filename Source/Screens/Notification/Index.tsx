import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Notification_Comp from '../../Components/Notification_Comp/Notification_Comp'
import { useSelector } from 'react-redux'
import SimpleHeader_Comp from '../../Components/GlobalComp/SimpleHeader_Comp' 
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { FetchingData_Api } from '../../Api/FetchingData_Api'

const Notification_Screen = ({ navigation } : any) => {

    useEffect(() => {
        callNotificationApi();
    }, [])

    const loginUser_id = useSelector((state:any) => state.UserProfile_Store.data.user_id)
    
    const [page, setPage] = useState(0)
    const [bottomLoader, setBottomLoader] = useState(false)
    const [pageNext, setPageNext] = useState(true)

    const [topLoader, setTopLoader] = useState(true)

    const [resume, setResume] = useState(true)
    const [data, setData] = useState([])

    async function callNotificationApi(isResult = false) {
        setResume(false)
        let nextPage : any = isResult ? 0 : page
        var formdata = new FormData();
        formdata.append("method", "get_notifications");
        formdata.append("user_id", loginUser_id);
        formdata.append("limit", "10");
        formdata.append("page", nextPage + 1);
        const resp = await FetchingData_Api("POST", 'profile', formdata);
        console.log("Api call in Notification :::", resp);
        // if (resp?.data && resp?.data?.length > 0) {
        if (resp?.status == 1) {
            setData(isResult ? resp.data : [...data, ...resp.data]);
            //--------------------------------
            setPage(nextPage + 1);
            setResume(true);
            pageNext == false && setPageNext(true);
            setTopLoader(false);
            bottomLoader == true && setBottomLoader(false);
            return;
        }
        bottomLoader && setBottomLoader(false);
        setTopLoader(false);
        setResume(true);
        setPageNext(false);
    }
    function deleteNotificationApi() {
        Alert.alert(
            "Delete Notifications",
            "do you wont to delete all notifications ?",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "OK", onPress: async () => {
                        var formdata = new FormData();
                        formdata.append("method", "delete_all_notifications");
                        formdata.append("user_id", loginUser_id);
                        const resp = await FetchingData_Api("POST", 'profile', formdata);
                        // console.log("Notifications delete,:::",resp);
                        if (resp.status == 1) {
                            setData([])
                        }
                        
                    }
                }
            ]
        );
    }

    function topRefresh() {
        if (resume) {
            setTopLoader(true)
            callNotificationApi(true);
            console.log("call Topper::", topLoader);
            topLoader && setTopLoader(false);
        }
    }

    function bottomRefresh() {
        if (data.length > 10) {
            if (pageNext) {
                if (resume) {
                    setBottomLoader(true)
                    console.log("call Bottom::", bottomLoader);
                    callNotificationApi();
                    console.log("data::::", data.length);
                }
            }
        }
    }

    function LoadingLayout() {
        return (
            <View>
                {
                    bottomLoader ?
                        <ActivityIndicator size='large' />
                        : null
                }
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SimpleHeader_Comp
                headerName='Notification'
                notification={true}
                onSubmit={() => deleteNotificationApi()}
            />

            <TouchableOpacity
                style={{ backgroundColor: 'grey', width: '100%', height: "7%", flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}
                onPress={() => { navigation.navigate('FollowingRequest_Screen') }}>
                <View style={{ marginHorizontal: 20, alignSelf: 'center' }}><Feather name="user-plus" size={30} color="white" /></View>
                <View style={{ alignItems: 'center' }}><Text style={{ color: 'white' }}>Following Requests</Text></View>
            </TouchableOpacity>

            <View style={{ flex: 1, marginHorizontal: '4%' }}>
                <FlatList
                    onRefresh={() => topRefresh()}
                    refreshing={topLoader}
                    ListFooterComponent={LoadingLayout()}
                    onEndReached={() => bottomRefresh()}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, height: '100%' }}
                    data={data}
                    keyExtractor={(item:any) => item.notification_id}
                    contentContainerStyle={{ paddingBottom: "25%" }}
                    renderItem={({ item }) => {
                        return (
                            <Notification_Comp
                                data={item}
                                navigation={navigation}
                                loginUser_id={loginUser_id}
                            />
                        );
                    }}
                />
            </View>
        </View>
    )
}

export default Notification_Screen