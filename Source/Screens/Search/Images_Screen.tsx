import { ActivityIndicator, Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list';

import { useDispatch, useSelector } from 'react-redux';
import AutoHeightImage from 'react-native-auto-height-image';

import dayjs from 'dayjs'
import { FontS } from '../../Utils/FontSize';
import { Ionicons } from '@expo/vector-icons';
import { Search_Styles } from '../../Styles';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import Spacer_Space from '../../Utils/Spacer_Space';
import { SearchImagePost_Action } from '../../Redux_Actions/Dispatch_Actions';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const Images_Screen = ({ route, navigation }: any) => {

    useEffect(() => {
        callPost(true, false);
    }, [])

    const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id)
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        navigation.addListener('focus', () => { callPost(true, true) })
    }, [navigation])

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [topLoader, setTopLoader] = useState(true);
    const [loader, setLoader] = useState(false);
    const [pageNext, setPageNext] = useState(true);
    const [resume, setResume] = useState(true);

    async function callPost(isReset = false, reLoad = false) {
        setResume(false)
        let pageNum: any = isReset === true ? 0 : page;
        var formdata = new FormData();
        formdata.append("method", "get_post_list");
        formdata.append("user_id", loginUser_id);
        formdata.append("limit", "16");
        formdata.append("page", reLoad ? pageNum : pageNum + 1);
        const res: any = await FetchingData_Api("POST", 'post', formdata);
        if (res?.data && res?.data?.length > 0) {
            reLoad ? setData([...res.data]) : setData(isReset ? [...res.data] : [...data, ...res.data]);
            reLoad ? dispatch(SearchImagePost_Action([...res.data])) : dispatch(SearchImagePost_Action(isReset ? [...res.data] : [...data, ...res.data]))
            setPage(pageNum + 1);
            //-------------------------
            setResume(true)
            setTopLoader(false)
            loader ? setLoader(false) : null
            pageNext === false && setPageNext(true)
            return;
        }
        setResume(true)
        setPageNext(false)
        setLoader(false)
    }

    function bottomRefreshCallApi() {
        if (data.length > 5 && pageNext) {
            if (resume) {
                setLoader(true)
                callPost()
            }
        }
    }

    function topRefreshCallApi() {
        if (resume) {
            setTopLoader(true)
            callPost(true,)
            // console.log("::::top",topLoader);
        }
    }


    const renderFooter = () => {
        return (
            <View style={{ paddingBottom: 90 }}>
                {
                    loader
                        ?
                        < ActivityIndicator size='large' />
                        : null
                }
            </View>
        )
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
            <Spacer_Space>
                <MasonryList
                    keyExtractor={(item: any) => item.post_id}
                    data={data}
                    // style={{ alignSelf: 'stretch', margin:'1%' }}
                    contentContainerStyle={{
                        alignSelf: 'stretch',
                    }}
                    refreshing={topLoader}
                    loading={false}
                    ListFooterComponent={renderFooter()}
                    onRefresh={() => topRefreshCallApi()}
                    onEndReached={() => { bottomRefreshCallApi() }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }: any) => {
                        return (
                            <TouchableWithoutFeedback key={i} onPress={() => {
                                navigation.navigate('SearchSinglePostView_Screen', {
                                    index: i,
                                })
                            }}>
                                <View style={Search_Styles.Image_MainContainer}>
                                    {item?.attachments && item?.attachments?.length > 0
                                        ?
                                        <AutoHeightImage
                                            width={200}
                                            style={Search_Styles.autoHeight}
                                            source={{ uri: item?.attachments[item?.attachments.length - 1]?.attachment }}
                                        />
                                        : null
                                    }
                                    <View style={Search_Styles.layoutContainer}>
                                        <View style={Search_Styles.innerContainer}>
                                            {item?.photo
                                                ?
                                                <Image
                                                    source={{ uri: item?.photo }}
                                                    style={Search_Styles.images}
                                                />
                                                : <Ionicons name="person-circle" size={FontS(35)} color="white" />
                                            }
                                            <View style={Search_Styles.textContainer}>
                                                <Text style={Search_Styles.fontStyle1}>{item.name}</Text>
                                                <Text style={Search_Styles.fontStyle2}>{dayjs(item.reg_date).fromNow()}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />
            </Spacer_Space>
        </KeyboardAvoidingView>
    )
}

export default Images_Screen