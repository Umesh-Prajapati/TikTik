import { ActivityIndicator, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import UserProfilePost_FlatList_Comp from './UserProfilePost_Comp/UserProfilePost_FlatList_Comp'
import ScreenLoader from '../../Screens/ScreenLoader/index'


const PostListing_Comp = (props: any) => {

    const navigation = useNavigation()
    const { login_user_id, user_2,
        post_Data,
        setTopLoader, topLoader,
        setResume, resume,
        pageNext,
        setBottomLoader, bottomLoader,
        callPost
    } = props

    const [data, setData] = useState<any>(post_Data);

    useEffect(() => {
        setData(post_Data);
    }, [post_Data]);

    useEffect(() => {
        navigation.addListener("focus", () => {
            callPost(true);
        });
    }, [navigation]);

    function bottomRefresh() {
        if (data.length >= 12)
            if (pageNext) {
                if (resume) {
                    console.log("Bottome=-=-=");
                    setBottomLoader(true)
                    callPost(false)
                }
            }
    }

    function topRefresh() {
        if (setResume) {
            console.log("Top=-=-=-");
            setTopLoader(true)
            callPost(true)
        }
    }

    function LoadingLayout() {
        return (
            <View>
                {
                    bottomLoader ?
                        <ActivityIndicator size='large' style={{ flex: 1, }} />
                        : null
                }
            </View>
        )
    }

    return (
        <Tabs.FlatList
            key={1}
            style={{ flexWrap: 'wrap', height: '100%' }}
            numColumns={3}
            refreshing={topLoader}
            onRefresh={() => topRefresh()}
            ListFooterComponent={<LoadingLayout />}
            onEndReached={() => bottomRefresh()}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={post_Data}
            renderItem={({ item, index }: any) => {
                return (
                    <UserProfilePost_FlatList_Comp
                        key={index.toString()}
                        data={item}
                        navigation={navigation}
                        index={index}
                    />
                );
            }}
        />
    );
}

export default PostListing_Comp