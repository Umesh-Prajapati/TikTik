import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { FetchingData_Api } from '../../../Api/FetchingData_Api'
import UserProfileImage_FlatList_Comp from './UserProfileImage_FlatList_Comp'
import { MyProfile_Action } from '../../../Redux_Actions/Dispatch_Actions'

const ImageListing_Comp = ({ login_user_id, user_2, navigation, postData }: any) => {

    // const navigation = useNavigation()

    const dispatch = useDispatch();
    const globalData = useSelector((state: any) => state.MyProfile_Store)
    const [data, setData] = useState<any>(postData);

    useEffect(() => {
        reRenderData()
    }, [globalData]);
    // useEffect(() => {
    //     navigation.addListener('focus', () => reRenderData());
    // }, [navigation]);

    // useEffect(() => {
    //     reRenderData()
    // }, [navigation]);

    function reRenderData() {

        setData([...globalData]);
    }

    const [topLoader, setTopLoader] = useState(false);
    const [bottomLoader, setBottomLoader] = useState(false);
    const [resume, setResume] = useState(true);
    const [pageNext, setPageNext] = useState(true);
    const [page, setPage] = useState(0);

    async function callPost(isReset = false) {
        setResume(false)
        let isNextPage = isReset ? 0 : page;
        let newPageNo = isNextPage + 1
        var formdata = new FormData();
        formdata.append("method", "get_post_list");
        formdata.append("user_id", login_user_id);
        formdata.append("limit", '10');
        formdata.append("page", newPageNo.toString());
        if (user_2) {
            formdata.append("user_2", user_2);
        }
        const resp = await FetchingData_Api("POST", 'post', formdata);
        // console.log("Profile Api Call...",);
        if (resp?.data && resp?.data?.length > 0) {
            setData(isReset ? [...resp.data] : [...data, ...resp.data]);
            //--------------------------------------
            setPage(isNextPage + 1)
            setResume(true)
            setTopLoader(false)
            bottomLoader == true && setBottomLoader(false)
            pageNext === false && setPageNext(true)
            return;
            //--------------------------------------
        }
        setBottomLoader(false)
        setResume(true)
        setPageNext(false)
    }

    function doLike(index: number) {
        let clone = [...data]
        if (clone?.length > 0) {
            let liked = clone[index].is_liked
            // console.log("before::", clone[index].is_liked);
            clone[index]
            if (liked == 1) {
                clone[index].is_liked = 0
                clone[index].likes = parseInt(clone[index].likes) - 1
            }
            if (liked == 0) {
                clone[index].likes = parseInt(clone[index].likes) + 1
                clone[index].is_liked = 1
            }
            dispatch(MyProfile_Action([...clone]))
            setData(clone);
            //--------------------------------------
            return;
            //--------------------------------------
        }
    }

    function doDeletePost(index: any) {
        let clone = [...data]
        if (clone?.length > 0) {
            clone.splice(index, 1)
            setData(clone);
            //--------------------------------------
            try {
                dispatch(MyProfile_Action([...clone]))
            } catch (e: any) {
                console.log("image list post Error==>", e.message);
            }
            //--------------------------------------
            return;
            //--------------------------------------
        }
    }

    function bottomRefresh() {
        if (data.length > 9)
            if (pageNext) {
                if (resume) {
                    // console.log("call222 ::: Bottom", resume);
                    if (data?.length > 3)
                        setBottomLoader(true)
                    callPost(false)
                }
            }
    }

    function topRefresh() {
        // console.log("call ::: Top", resume);
        if (resume) {
            setTopLoader(true)
            callPost(true)
            setTopLoader(false)
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
        <Tabs.FlatList
            key={2}
            refreshing={topLoader}
            onRefresh={() => topRefresh()}
            style={{ flex: 1, marginTop: '1%' }}
            ListFooterComponentStyle={{ marginBottom: '15%' }}
            ListFooterComponent={<LoadingLayout />}
            onEndReached={() => bottomRefresh()}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            initialNumToRender={10}
            renderItem={({ item, index }) => {
                return (
                    <UserProfileImage_FlatList_Comp
                        key={index}
                        item={item}
                        index={index}
                        navigation={navigation}
                        loginUser_id={login_user_id}
                        doLike={() => {
                            doLike(index);
                        }}
                        doDeletePost={() => doDeletePost(index)}
                    />
                )
            }}
        />
    )
}

export default ImageListing_Comp

const styles = StyleSheet.create({})