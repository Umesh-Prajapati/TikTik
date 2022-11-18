import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs';
import { FontS } from '../../Utils/FontSize';
import { Ionicons } from '@expo/vector-icons';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import Spacer_Space from '../../Utils/Spacer_Space';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FollowingRequest_Screen = ({ navigation }: any) => {

    useEffect(() => {
        navigation.addListener('focus', () => getFollowReq(false, true))
    }, [navigation]);

    const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id)
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-
    const [topLoader, setTopLoader] = useState(true);
    const [bottomLoader, setBottomLoader] = useState(false);
    const [resume, setResume] = useState(true);
    const [pageNext, setPageNext] = useState(true);
    const [page, setPage] = useState(0);
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-
    const [data, setData] = useState<any>([]);

    async function getFollowReq(isReset = false, Resume = false) {
        setResume(false)
        let isNextPage: any = isReset ? 0 : page;
        var formdata = new FormData();
        formdata.append("method", "get_following_requests");
        formdata.append("user_id", loginUser_id);
        formdata.append("limit", '7');
        formdata.append("page", Resume ? isNextPage : isNextPage + 1);
        const resp = await FetchingData_Api("POST", 'profile', formdata);
        try {
            if (resp?.data && resp?.data?.length > 0) {
                Resume ? setData([...resp.data]) : setData(isReset ? [...resp.data] : [...data, ...resp.data])
                //--------------------------------------
                !Resume && setPage(isNextPage + 1)
                pageNext == false && setPageNext(true)
                setResume(true)
                bottomLoader == true && setBottomLoader(false)
                setTopLoader(false)
                return;
                //--------------------------------------
            }
        } catch (e: any) {
            console.log("Follow Following Request Error in  Notification===>", e.message)
        }
        setTopLoader(false)
        setResume(true)
        setBottomLoader(false)
        setPageNext(false)
    }

    function bottomRefresh() {
        if (data.length > 6) {
            if (pageNext) {
                if (resume) {
                    console.log("call ::: Bottom", pageNext);
                    setBottomLoader(true)
                    getFollowReq(false, false)
                }
            }
        }
    }

    function topRefresh() {
        console.log("call ::: Top", resume);
        if (resume) {
            setTopLoader(true)
            getFollowReq(true, false)
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
        );
    }


    return (
        <View style={{ height: "100%", backgroundColor: 'white', flex: 1, }}>
            <FlatList
                onRefresh={() => topRefresh()}
                refreshing={topLoader}
                ListFooterComponent={<LoadingLayout />}
                onEndReached={() => bottomRefresh()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: "25%" }}
                keyExtractor={(item, index): any => index}
                data={data}
                extraData={data}
                renderItem={({ item, index }) => {
                    return <Spacer_Space>
                        <View style={styles.MainContainer}>
                            <View style={styles.Container}>
                                <View style={styles.imageContainer}>
                                    {
                                        item?.photo
                                            ? <Image style={styles.profileImage} source={{ uri: item?.photo }} />
                                            : <Ionicons name="person-circle" size={FontS(50)} color="white" />
                                    }
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('OtherUserProfile_Screen', { user_2: item?.user_id })
                                    }}>
                                    <View style={styles.textContainer}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.text1}>{item.name} </Text>
                                            <Text style={styles.text2}>Requested.</Text>
                                        </View>
                                        <Text style={styles.text3}>{dayjs(item.requested_at).fromNow()}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View >
                    </Spacer_Space>
                }}
            />
        </View>
    )
}

export default FollowingRequest_Screen


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
    },
    Container: {
        height: windowHeight / 11,
        width: windowWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        width: FontS(55),
        aspectRatio: 1,
        backgroundColor: 'black',
        marginRight: '5%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        aspectRatio: 1,
        borderRadius: 100
    },
    textContainer: {
        height: '70%',
        justifyContent: 'space-evenly',
    },
    text1: {
        fontSize: FontS(15),
        fontWeight: '500'
    },
    text2: {
        fontSize: FontS(15),
    },
    text3: {
        fontSize: FontS(15),
        color: 'rgb(206,168,168)',
    }
})