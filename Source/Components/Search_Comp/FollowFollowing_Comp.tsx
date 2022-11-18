import { ActivityIndicator, Button, FlatList, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import Spacer_Space from '../../Utils/Spacer_Space'
import Search_Input_Comp from '../GlobalComp/Search_Input_Comp'
import UsersList_Comp from '../FollowFollowing_Comp/UsersList_Comp'

const FollowFollowing_Comp = ({ route, navigation }: any) => {

    const { loginUser_id, user_2, ApiType } = route.params

    useEffect(() => {
        // checkApi(false, true);
    }, [])

    useEffect(() => {
        navigation.addListener('focus', () => checkApi(false, true));
    }, [navigation])

    const loginUser_ProfileType = useSelector((state: any) => state.UserProfile_Store.data.settings.profile);
    //--------------------------------------------------------------

    const [page, setPage] = useState(1)
    const [bottomLoader, setBottomLoader] = useState(false)
    const [pageNext, setPageNext] = useState(true)
    const [topLoader, setTopLoader] = useState(true)
    const [resume, setResume] = useState(true)
    const [data, setData] = useState<any>([])

    // const [newData, setNewData] = useState([])

    const [searchLoader, setSearchLoader] = useState(false)
    const [search, setSearch] = useState('')
    //-------------------------------------------------------------

    function checkApi(check : any, navigateCallApi = false) {
        if (ApiType == 'get_followers') Get_Followers(check, navigateCallApi)
        if (ApiType == 'get_followings') Get_Followings(check, navigateCallApi)
    }

    async function Get_Followers(isResult = false, navigateCallApi = false) {
        setResume(false)
        let nextPage : any = isResult ? 0 : page
        var formdata = new FormData();
        formdata.append("method", ApiType);
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);
        formdata.append("limit", "10");
        formdata.append("page", navigateCallApi ? page : nextPage + 1);
        //-=-=--=-=--=-=
        search ? formdata.append("search", search) : null;
        //-=-=--=-=--=-=
        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp && resp?.status == 1) {
            // console.log(resp.data);
            navigateCallApi ? setData(resp.data.followers) : setData(isResult ? resp.data.followers : [...data, ...resp.data.followers])
            //--------------------------------
            navigateCallApi !== true ? setPage(nextPage + 1) : null
            setResume(true);
            pageNext == false && setPageNext(true)
            setTopLoader(false);
            bottomLoader == true && setBottomLoader(false);
            setSearchLoader(false);
            return;
        }
        setSearchLoader(false);
        bottomLoader && setBottomLoader(false);
        setTopLoader(false);
        setResume(true);
        setPageNext(false);
    }
    async function Get_Followings(isResult = false, navigateCallApi = false) {
        setResume(false)
        let nextPage : any = isResult ? 0 : page
        var formdata = new FormData();
        formdata.append("method", ApiType);
        formdata.append("user_id", loginUser_id);
        formdata.append("user_2", user_2);
        formdata.append("limit", "10");
        formdata.append("page", navigateCallApi ? page : nextPage + 1);

        search ? formdata.append("search", search) : null;

        const resp = await FetchingData_Api("POST", 'profile', formdata);
        if (resp && resp?.status == 1) {
            navigateCallApi ? setData(resp.data.followings) : setData(isResult ? resp.data.followings : [...data, ...resp.data.followings])
            //--------------------------------
            navigateCallApi !== true ? setPage(nextPage + 1) : null
            setResume(true);
            pageNext == false && setPageNext(true);
            setTopLoader(false);
            bottomLoader == true && setBottomLoader(false);
            setSearchLoader(false);
            return;
        }
        setSearchLoader(false);
        bottomLoader && setBottomLoader(false);
        setTopLoader(false);
        setResume(true);
        setPageNext(false);
    }


    function topRefresh() {
        if (resume) {
            setTopLoader(true)
            checkApi(true, false);
            // console.log("call Topper::", topLoader);
            topLoader && setTopLoader(false);
        }
    }

    function bottomRefresh() {
        if (data.length > 10) {
            if (pageNext) {
                if (resume) {
                    setBottomLoader(true)
                    // console.log("call Bottom::", bottomLoader);
                    checkApi(false, false);
                    // console.log("data::::", data.length);
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

    function callSearch() {
        setSearchLoader(true)
        checkApi(true, false)
    }

    return (
        <KeyboardAvoidingView style={{ backgroundColor: 'white', flex: 1 }}>
            <Spacer_Space>
                <Search_Input_Comp
                    isLoading={searchLoader}
                    onChange={(e:any) => setSearch(e)}
                    onSubmit={() => { callSearch() }}
                />
                <FlatList
                    onRefresh={() => topRefresh()}
                    refreshing={topLoader}
                    ListFooterComponent={LoadingLayout()}
                    onEndReached={() => bottomRefresh()}
                    showsVerticalScrollIndicator={false}
                    style={{ height: '100%', marginTop: '4%' }}
                    data={data}
                    keyExtractor={(item, index) : any => index}
                    renderItem={({ item, index }) => {
                        return (
                            <UsersList_Comp
                                loginUser_ProfileType={loginUser_ProfileType}
                                user_2_ProfileType={item.profile_status}
                                item={item}
                                whichType={ApiType}
                                loginUser_id={loginUser_id}
                                user_2={item.user_id}
                                onSubmit={() => checkApi(false, true)}
                            />
                        )
                    }}
                />
            </Spacer_Space>
        </KeyboardAvoidingView>
    )
}

export default FollowFollowing_Comp
