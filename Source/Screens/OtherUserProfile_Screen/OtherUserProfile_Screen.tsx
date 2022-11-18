import { Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs } from 'react-native-collapsible-tab-view'

import ScreenLoader from '../ScreenLoader'
import { FetchingData_Api } from '../../Api/FetchingData_Api'

import UserProfile_Header_Comp from '../../Components/OtherUserProfile_Comp/UserProfile_Header_Comp/UserProfile_Header_Comp'
import PostListing_Comp from '../../Components/OtherUserProfile_Comp/PostListing_Comp'
import ImageListing_Comp from '../../Components/OtherUserProfile_Comp/UserProfileImage_Comp/ImageListing_Comp'
import { MyProfile_Action } from '../../Redux_Actions/Dispatch_Actions'

const OtherUserProfile_Screen = ({ route, navigation }: any) => {

    const dispatch = useDispatch();
    const [screenLoader, setScreenLoader] = useState(true);
    useEffect(() => {
        setScreenLoader(true)
        // callPost(true)
    }, []);
    const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id);
    const ProfileType_LoginUser = useSelector((state: any) => state.UserProfile_Store.data.settings?.profile);
    let user_2 = route?.params?.user_2 || loginUser_id
    const postData = useSelector((state: any) => state.MyProfile_Store);

    const [data, setData] = useState<any>({});

    useLayoutEffect(() => {
        navigation.addListener('beforeRemove', () => {
            dispatch(MyProfile_Action([]));
        })
    }, []); // before blank postData

    useEffect(() => {
        const OnFocus = navigation.addListener('focus', () => {
            getPostList();
            callGetProfile();
            callPost(true)
        });
        return OnFocus;
    }, [navigation]);

    useEffect(() => {
        getPostList();
    }, [postData])

    useEffect(() => {
        condition();
    }, [data])

    const [topLoader, setTopLoader] = useState(false);
    const [bottomLoader, setBottomLoader] = useState(false);
    const [resume, setResume] = useState(true);
    const [pageNext, setPageNext] = useState(true);
    const [page, setPage] = useState(0);
    //----------------------------------------------------------------------

    async function callPost(isReset = false){
        setResume(false);
        let isNextPage = isReset ? 1 : page;
        var formdata = new FormData();
        formdata.append("method", "get_post_list");
        formdata.append("user_id", loginUser_id);
        formdata.append("limit", '12');
        formdata.append("page", isNextPage.toString());
        if (user_2) {
            formdata.append("user_2", user_2);
        }
        const resp = await FetchingData_Api("POST", 'post', formdata);
        console.log("Profile Api Call...", formdata);
        if (resp?.data?.length > 0 && resp?.status == 1) {
            dispatch(MyProfile_Action(isReset ? [...resp?.data] : [...data, ...resp?.data]));
            setPage(isNextPage + 1);
            setTopLoader(false);
            bottomLoader == true && setBottomLoader(false);
            pageNext === false && setPageNext(true);
            setTimeout(() => { screenLoader == true && setScreenLoader(false) }, 800);
            setResume(true);
            return;
            //-------------------------------------- 
        }
        setTopLoader(false)
        setBottomLoader(false)
        setPageNext(false)
        setResume(true)
        setTimeout(() => { screenLoader == true && setScreenLoader(false) }, 800)
    }

    //----------------------------------------------------------------------
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalPost, setTotalPost] = useState(0);
    const [btnName, setBtnName] = useState('');
    //----------------------------------------------------------------------
    async function callGetProfile() {
        var formdata = new FormData();
        formdata.append("method", "get_profile");
        formdata.append("user_id", loginUser_id);
        if (user_2) {
            formdata.append("user_2", user_2);
        }
        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp?.data) {
            setData(resp.data);
            setTimeout(() => { screenLoader == true && setScreenLoader(false) }, 800)
        }
    }
    //----------------------------------------------------------------------
    async function getPostList() {
        // console.log("----------------------------");
        var formdata = new FormData();
        formdata.append("method", "get_post_list");
        formdata.append("user_id", loginUser_id);
        if (user_2) {
            formdata.append("user_2", user_2);
        }
        const resp = await FetchingData_Api("POST", 'post', formdata);
        if (resp?.data && resp?.status == 1) {
            let totLikes = 0;
            for (var i = 0; i < resp?.data?.length; i++) {
                totLikes = totLikes + parseInt(resp?.data[i]?.likes);
            }
            setTotalLikes(totLikes);
            setTotalPost(resp?.data?.length);
        }
    }
    //----------------------------------------------------------------------


    if (screenLoader) {
        return <ScreenLoader />
    }

    function privateComp() {
        return (
            <View style={{ flex: 1 }}>
                <UserProfile_Header_Comp
                    btnName={btnName}
                    data={data}
                    loginUser_id={loginUser_id}
                    user_2={user_2}
                    callGetProfile={() => callGetProfile()}
                    totalLikes={totalLikes}
                    totalPost={totalPost}
                    touchable={false}
                    ProfileType_LoginUser={ProfileType_LoginUser}
                />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FontAwesome name="lock" size={100} color="grey" />
                    <Text>This Is Private Account</Text>
                </View>
            </View>
        );
    }

    function publicComp() {
        return (
            <View style={{ flex: 1 }}>
                <Tabs.Container
                    key={5}
                    renderHeader={() => {
                        return <UserProfile_Header_Comp
                            btnName={btnName}
                            data={data}
                            loginUser_id={loginUser_id}
                            user_2={user_2}
                            callGetProfile={() => callGetProfile()}
                            totalLikes={totalLikes}
                            totalPost={totalPost}
                            touchable={true}
                            ProfileType_LoginUser={ProfileType_LoginUser}
                        />
                    }} >
                    <Tabs.Tab name='PostListing' key={1}>
                        <PostListing_Comp
                            topLoader={topLoader}
                            setTopLoader={setTopLoader}

                            resume={resume}
                            setResume={setResume}

                            bottomLoader={bottomLoader}
                            setBottomLoader={setBottomLoader}

                            pageNext={pageNext}

                            callPost={(e:any)=>callPost(e)}

                            post_Data={postData}
                            login_user_id={loginUser_id}
                            user_2={user_2}
                        />
                    </Tabs.Tab>
                    <Tabs.Tab name='ImagesListing' key={2}>
                        <ImageListing_Comp
                            navigation={navigation}
                            login_user_id={loginUser_id}
                            user_2={user_2}
                            postData={postData}
                        />
                    </Tabs.Tab>
                </Tabs.Container >
            </View>
        );
    }

    function condition() {
        if (ProfileType_LoginUser == 1 && data?.settings?.profile == 0) {
            if (data?.user_1_follow_request == null && data?.user_2_follow_request == null) setBtnName('Follow')
            else if (data?.user_1_follow_request == 'accepted' && data?.user_2_follow_request == 'accepted') setBtnName('UnFollow')
            else if (data?.user_1_follow_request == 'accepted' && data?.user_2_follow_request == null) setBtnName('UnFollow')
            else if (data?.user_1_follow_request == null && data?.user_2_follow_request == 'accepted') setBtnName('Follow Back')
            else if (data?.user_1_follow_request == 'pending' && data?.user_2_follow_request == null) setBtnName('Requested')
            else if (data?.user_1_follow_request == 'pending' && data?.user_2_follow_request == 'accepted') setBtnName('Requested')
            else setBtnName('Accept/Cancel')
        } else {
            if (data?.user_1_follow_request == null && data?.user_2_follow_request == null) setBtnName('Follow')
            else if (data?.user_1_follow_request == 'accepted' && data?.user_2_follow_request == 'accepted') setBtnName('UnFollow')
            else if (data?.user_1_follow_request == 'accepted' && data?.user_2_follow_request == null) setBtnName('UnFollow')
            else if (data?.user_1_follow_request == null && data?.user_2_follow_request == 'accepted') setBtnName('Follow Back')
            else if (data?.user_1_follow_request == 'pending' && data?.user_2_follow_request == 'accepted') setBtnName('Requested')
            else if (data?.user_1_follow_request == 'pending' && data?.user_2_follow_request == null) setBtnName('Requested')
            else if (data?.user_1_follow_request == 'accepted' && data?.user_2_follow_request == 'pending') setBtnName('Accept/Cancel')
            else setBtnName('Accept/Cancel')
        }
    }

    function callComp() {
        if (loginUser_id == user_2) return publicComp();
        if (ProfileType_LoginUser == 1 && data?.settings?.profile == 0) {
            if (btnName == 'UnFollow') {
                return publicComp()
            } else {
                return privateComp()
            }
        } else {
            return publicComp()
        }
    }

    return <>
        {callComp()}
    </>
}

export default OtherUserProfile_Screen