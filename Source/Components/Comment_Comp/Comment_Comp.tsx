import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ScrollView,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Comment_Input_Comp from "./Comment_Input_Comp";
import Comment_FlatList_Comp from "./Comment_FlatList_Comp";
import { FetchingData_Api } from "../../Api/FetchingData_Api";
import Spacer_Space from "../../Utils/Spacer_Space";
import { FontS } from "../../Utils/FontSize";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const Comment_Comp = (props: any) => {

    const {
        userPhoto,
        post_id,
        postUser_id,
        userName,
        description,
        totalComment,
        Add_Comment,
        Delete_Comment,
    }:any = props;

    const kAvoidSty = Platform.OS === "ios" ? "padding" : undefined;
    const user_id = useSelector((state: any) => state.UserProfile_Store.data.user_id);

    useEffect(() => {
        callGetCommentApi(true);
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    //-------------------------------------------------------
    const [topLoader, setTopLoader] = useState(true);
    const [bottomLoader, setBottomLoader] = useState(false);
    const [resume, setResume] = useState(true);
    const [pageNext, setPageNext] = useState(true);
    const [page, setPage] = useState(0);
    //-------------------------------------------------------
    const [data, setData] = useState<any>([]);
    //-------------------------------------------------------
    const [message, setMessage] = useState("");
    const [index, setIndex] = useState("");
    const [commentID, setCommentID] = useState("");
    const [commentEditMode, setCommentEditMode] = useState(false);
    //-------------------------------------------------------
    const [commentTotal, setCommentTotal] = useState(parseInt(totalComment) || 0);
    //-------------------------------------------------------
    async function callGetCommentApi(isReset = false) {
        setResume(false);
        setTopLoader(true);
        let isNextPage = isReset ? 0 : page;
        let pagingApi = isNextPage + 1;
        const formData = new FormData();
        formData.append("method", "get_post_comments");
        formData.append("user_id", postUser_id);
        formData.append("post_id", post_id);
        formData.append("limit", "10");
        formData.append("page", pagingApi.toString());

        const res = await FetchingData_Api("POST", "post", formData);
        if (res.status == 1) {
            setData(isReset == true ? [...res?.data] : [...data, ...res?.data]);
            // setCommentTotal(res.data.length)
            setIsLoading(false);
            //-----------------------------
            setPage(isNextPage + 1);
            pageNext == false && setPageNext(true);
            setResume(true);
            bottomLoader == true && setBottomLoader(false);
            setTopLoader(false);
            return;
        }
        setBottomLoader(false);
        setResume(true);
        setPageNext(false);
    }
    //-------------------------------------------------------
    async function callDeleteCommentApi(comment_id: any, index: any) {
        console.log(comment_id);
        console.log(post_id);
        // console.log();
        const formData = new FormData();
        formData.append("method", "delete_post_comment");
        formData.append("post_id", post_id);
        formData.append("user_id", user_id);
        formData.append("comment_id", comment_id);

        const res = await FetchingData_Api("POST", "post", formData);
        if (res.status == 1) {
            // console.log(res);
            let cloneData = [...data];
            cloneData.splice(index, 1);
            setData(cloneData);
            setCommentTotal(commentTotal - 1);
            //-=-=-==-=-=-===-=-=-=-=-=-=-=-=-=-
            // if (whichTypeScreen == "HomeScreen") {
            //     dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) - 1;
            //     dispatch(Api_Response_Data(dispatchCommentTotal));
            // }
            // if (whichTypeScreen == "SingleProfileScreen") {
            //     dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) - 1;
            //     dispatch(SingleProfileData(dispatchCommentTotal));
            // }
            //-=-=-==-=-=-===-=-=-=-=-=-=-=-=-=-
            Delete_Comment(totalComment);
            CloseEditMode();
        }
    }
    //-------------------------------------------------------
    function callEditCommentApi(comment_id: any, value: any, index: any) {
        setCommentID(comment_id);
        setMessage(value);
        setIndex(index);
        setCommentEditMode(true);
    }
    //-------------------------------------------------------
    function CloseEditMode() {
        setMessage("");
        setCommentID("");
        setIndex("");
        setCommentEditMode(false);
    }
    //-------------------------------------------------------
    async function callCommentApi() {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("method", "comment_post");
            formData.append("user_id", user_id);
            formData.append("post_id", post_id);
            formData.append("comment", message);
            commentID ? formData.append("comment_id", commentID) : null;
            // console.log("formdata::",formData);
            const res = await FetchingData_Api("POST", "post", formData);
            if (res.status == 1) {
                if (commentEditMode) {
                    data[index].comment = message;
                } else {
                    //-=-=-==-=-=-===-=-=-=-=-=-=-=-=-=-
                    // if (whichTypeScreen == "HomeScreen") {
                    //     dispatchCommentTotal[ArrayIndex].comments =
                    //         parseInt(commentTotal) + 1;
                    //     dispatch(Api_Response_Data(dispatchCommentTotal));
                    // }
                    // if (whichTypeScreen == "SingleProfileScreen") {
                    //     dispatchCommentTotal[ArrayIndex].comments =
                    //         parseInt(commentTotal) + 1;
                    //     dispatch(SingleProfileData(dispatchCommentTotal));
                    // }
                    //-=-=-==-=-=-===-=-=-=-=-=-=-=-=-=-
                    setCommentTotal(commentTotal + 1);
                    callGetCommentApi(true);
                    Add_Comment(commentTotal);
                }
                console.log(res);
                CloseEditMode();
                setIsLoading(false);
            }
        } catch (e: any) {
            setIsLoading(false);
            console.log("CommentApiCall::", e.message);
            // setError(e.message);
        }
    }
    //-------------------------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------

    function bottomRefresh() {
        if (data.length > 9) {
            // console.log("call ::: Bottom", pageNext);
            if (pageNext == true) {
                if (resume) {
                    setBottomLoader(true);
                    callGetCommentApi(false);
                }
            }
        }
    }

    function topRefresh() {
        // console.log("call ::: Top", resume);
        if (resume) {
            setTopLoader(true);
            callGetCommentApi(true);
        }
    }

    function LoadingLayout() {
        return (
            <View>{bottomLoader ? <ActivityIndicator size="large" /> : null}</View>
        );
    }

    return (
        <KeyboardAvoidingView behavior={kAvoidSty} style={{ flex: 1 }}>
            <>
                <KeyboardAvoidingView behavior={kAvoidSty} style={{ flex: 1, position: "absolute", zIndex: 20, bottom: 0, width: '100%' }}>
                    <ScrollView style={{ flex: 1, position: "absolute", zIndex: 20, bottom: 0, width: '100%' }}>
                        <Comment_Input_Comp
                            isLoading={isLoading}
                            commentEditMode={commentEditMode}
                            value={message}
                            setMessage={setMessage}
                            onSubmit={() => callCommentApi()}
                            updateComment_Cancel={() => {
                                CloseEditMode();
                            }}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>

                <View style={{ flex: 1, height: "100%", }}>
                    <Spacer_Space>
                        {/* top comment Total.. */}
                        <View style={styles.firstContainer}>
                            <FontAwesome name="commenting" size={FontS(17)} color="grey" adjustsFontSizeToFit={true} allowFontScaling style={{}} />
                            <Text style={styles.commentTitle}> {commentTotal} Comments</Text>
                        </View>

                        {/* profile Image */}
                        <View style={styles.userProfileContainer}>
                            <View style={styles.userCard}>
                                {userPhoto.length > 0 ? (
                                    <Image source={{ uri: userPhoto }} style={styles.userImage} />
                                ) : null}
                                <View style={styles.userName}>
                                    <Text style={styles.userName.fontStyle}>{userName}</Text>
                                </View>
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{
                                    flexGrow: 1,
                                    maxHeight: windowWidth / 2,
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={styles.description}>{description}</Text>
                            </ScrollView>
                        </View>
                        <View style={{ borderBottomColor: "grey", borderBottomWidth: 0.2 }} />
                        {/* <KeyboardAvoidingView behavior={kAvoidSty} style={{ flex: 1 }}> */}

                        <FlatList
                            style={{ height: "100%" }}
                            onRefresh={() => topRefresh()}
                            refreshing={topLoader}
                            ListFooterComponent={<LoadingLayout />}
                            onEndReached={() => bottomRefresh()}
                            showsVerticalScrollIndicator={false}
                            data={data}
                            renderItem={({ item, index }) => {
                                return (
                                    <Comment_FlatList_Comp
                                        myComment={item.user_id == user_id ? true : false}
                                        item={item}
                                        index={index}
                                        doDeleteComment={() => { callDeleteCommentApi(item.comment_id, index); }}
                                        doUpdateComment={() => { callEditCommentApi(item.comment_id, item.comment, index); }}
                                    />
                                );
                            }}
                        />
                        {/* </KeyboardAvoidingView> */}
                    </Spacer_Space>
                </View>

            </>
        </KeyboardAvoidingView>
    );
};

export default Comment_Comp;

const colorOne = "rgb(171,169,169)";

const styles = StyleSheet.create({
    firstContainer: {
        alignSelf: "center",
        flexDirection: "row",
    },
    commentTotal: {
        width: 15,
        height: 14,
        marginRight: 5,
    },
    commentTitle: {
        color: colorOne,
    },
    userProfileContainer: {
        // justifyContent:
        // flex:1
    },
    userCard: {
        flexDirection: "row",
    },
    userName: {
        alignSelf: "center",
        margin: 13,
        fontStyle: {
            fontSize: FontS(16),
            fontWeight: "500",
        },
    },
    userImage: {
        width: 44,
        height: 44,
        borderRadius: 100,
    },
    description: {
        marginVertical: 15,
        fontSize: 14,
    },
});
