import { Alert, Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RBSheet from "react-native-raw-bottom-sheet";
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import { FontS } from '../../Utils/FontSize';
import ReportOnPost_Comp from '../GlobalComp/ReportOnPost_Comp';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Single_Post_Detail_Comp = (props:any) => {

    const { data, navigation, loginUser_id, index,
        postLike, postDelete, whichTypeScreen,
    } = props

    // console.log("Single POsty View Data:::=>",data);
    
    useLayoutEffect(() => {
        reRenderData()
        navigation.addListener('focus', () => reRenderData());
    }, [data]);
    
    const [title, setTitle] = useState(data?.title)
    const [description, setDescription] = useState(data?.description)
    let imgUrl = data?.attachments && data?.attachments?.length && data?.attachments[data?.attachments?.length - 1]?.attachment || ''
    const [imageUrl, setImageUrl] = useState(imgUrl)
    
    const [commentTotal, setCommentTotal] = useState(data?.comments)

    const [likes, setLikes] = useState(data?.likes)
    const [is_liked, setIs_Liked] = useState(data?.is_liked)

    const { top, bottom } = useSafeAreaInsets();
    let h1 = top + bottom;

    const refRBSheet = useRef(null);

    function reRenderData() {
        setLikes(data?.likes)
        setIs_Liked(data?.is_liked)
        setCommentTotal(data?.comments)
        setTitle(data?.title)
        setDescription(data?.description)
        setImageUrl(data?.attachments[data?.attachments?.length - 1]?.attachment || '');
    }
    //--------------------------------------------------------------
    async function callLikeApi(p_id:any) {
        var formdata = new FormData();
        formdata.append("method", "like_post");
        formdata.append("post_id", p_id);
        formdata.append("user_id", loginUser_id);
        try {
            const resp = await FetchingData_Api("POST", 'post', formdata);
            if (resp.status === 1) {
                postLike();
                reRenderData()
            }
        } catch (e) {
            console.log("Error Log in Api Rerender..(SinglePostView):::", e);
        }
    }
    //--------------------------------------------------------------
    async function CallDeletePostApi(post_id:any, user_id:any) {
        Alert.alert(
            "Delete Post",
            "are you sure you wan't to delete your post !",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        var formdata = new FormData();
                        formdata.append("method", "delete_post");
                        formdata.append("post_id", post_id);
                        formdata.append("user_id", user_id);
                        const resp = await FetchingData_Api("POST", 'post', formdata)
                        console.log("delete post via PostDetails:::", resp);
                        refRBSheet.current.close();
                        //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                        // let temp = postData
                        // let cut = temp.splice(index, 1)
                        // dispatch(SingleProfileData(cut))
                        //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
                        postDelete();
                        navigation.goBack();
                    }
                }
            ]
        );
    }
    //--------------------------------------------------------------

    return (
        <View style={[styles.container, { height: windowHeight - h1 }]}>
            {data?.attachments && data?.attachments?.length > 0
                ?
                <Image
                    style={[styles.background, StyleSheet.absoluteFill]}
                    source={{ uri: imageUrl || "" }}
                    resizeMode='cover' />
                : null
            }
            <View style={styles.linearBg}>
                <LinearGradient style={styles.secondInnerContainer} colors={['transparent', 'rgba(0,0,0,.85)',]}>
                    <View style={styles.verticalContainer}>
                        <Text style={styles.userName}>@{data?.name}</Text>
                        <Text style={styles.postTitle}>{title}</Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.descriptionView}>
                            <Text style={styles.postDescription}>{description}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.horizontalContainer}>
                        <TouchableWithoutFeedback onPress={() => { callLikeApi(data?.post_id) }}>
                            <View style={styles.imagesContainer}>
                                {
                                    is_liked == '0'
                                        ? <Ionicons name="heart-outline" size={FontS(40)} color="white" />
                                        : <Ionicons name="heart-sharp" size={FontS(40)} color="#ff555f" />
                                }
                                <Text style={{ color: 'white' }}>{likes}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Comment_Screen', {
                            ArrayIndex: index,
                            userPhoto: data?.photo,
                            whichTypeScreen: whichTypeScreen,
                            postUser_id: data?.user_id,
                            post_id: data?.post_id,
                            // comments: data?.comments,
                            userName: data?.name,
                            description: data?.description,
                            totalComment: data?.comments
                        })} >
                            <View style={styles.imagesContainer}>
                                <FontAwesome name="commenting" size={FontS(40)} color="white" />
                                <Text style={{ color: 'white' }}>{commentTotal}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
                            <View style={styles.imagesContainer}>
                                <Entypo name="dots-three-vertical" size={FontS(32)} color="white" />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </LinearGradient>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask
                closeOnPressBack
                height={200}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }} >
                {
                    data?.user_id == loginUser_id
                        ? <View>
                            <ButtonComp
                                btnName='Edit Post'
                                onSubmit={() => {
                                    refRBSheet.current.close()
                                    navigation.navigate('EditPost_Screen',
                                        {
                                            index: index,
                                            user_id: loginUser_id,
                                            post_id: data?.post_id,
                                            img_uri: data?.attachments[0]?.attachment,
                                            title: data?.title,
                                            description: data?.description,
                                            whichScreen: whichTypeScreen,
                                        })
                                }} />
                            <ButtonComp
                                btnName='Delete Post'
                                onSubmit={() => { CallDeletePostApi(data?.post_id, loginUser_id) }} />
                        </View>
                        : <KeyboardAvoidingView>
                            <ReportOnPost_Comp
                                user_id={loginUser_id}
                                post_id={data?.post_id}
                                closeBtmSheet={() => { refRBSheet.current.close() }}
                            />
                        </KeyboardAvoidingView>
                }
            </RBSheet>
        </View>
    )
}

export default Single_Post_Detail_Comp

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: windowWidth,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
    },

    background: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white', // background color
    },

    //upper part start...

    firstInnerContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    linearBg: {
        flex: 1,
        width: '100%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        zIndex: 2,
    },

    secondInnerContainer: {
        height: "40%",
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: windowWidth / 50,
    },
    descriptionView: {
        // backgroundColor:'red',
        maxHeight: windowHeight * 0.25,
        flexGrow: 0,
        marginBottom: windowHeight / 30,
    },
    verticalContainer: {
        height: windowHeight,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    },
    userName: {
        fontSize: FontS(18),
        marginTop: 8,
        color: 'white',
    },
    postTitle: {
        fontSize: FontS(18),
        marginTop: 8,
        color: 'white',
    },
    postDescription: {
        fontSize: FontS(18),
        marginTop: 8,
        color: 'white',
    },


    horizontalContainer: {
        // backgroundColor: 'green',
        marginLeft: 5,
        height: windowHeight / 3,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: windowHeight / 14,
        height: windowHeight / 14,
        borderRadius: 100,
    },
    imagesContainer: {
        alignItems: 'center'
    },
    elementImage: {
        height: windowHeight / 25,
        width: windowHeight / 22,
        marginBottom: "10%",
    },

})



const ButtonComp = (props:any) => {

    const { btnName, onSubmit } = props

    return (
        <View style={stylesbtn.btnContainer}>
            <TouchableOpacity style={stylesbtn.btn} onPress={() => { onSubmit() }}>
                <Text style={stylesbtn.btnText}>{btnName}</Text>
            </TouchableOpacity>
        </View>
    );
}

const stylesbtn = StyleSheet.create({
    btnContainer: {
        marginTop: '3%',
        alignSelf: 'center'
    },
    btn: {
        height: 45,
        width: 240,
        backgroundColor: `rgb(22,149,240)`,
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: `rgba(89,88,89,0.83)`,
        shadowOffset: { width: 0, height: 1, blur: 4 },
        // shadowOpacity: 0.4,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },

})