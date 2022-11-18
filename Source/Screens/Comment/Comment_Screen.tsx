import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { HomePost_Action, MyProfile_Action, NotificationImagePost_Action, SearchImagePost_Action } from '../../Redux_Actions/Dispatch_Actions';
import Comment_Comp from '../../Components/Comment_Comp/Comment_Comp';

const Comment_Screen = ({ route }: any) => {

    const {
        userPhoto,
        post_id,
        postUser_id,
        userName,
        description,
        whichTypeScreen,
        totalComment,
    } = route.params;

    const ArrayIndex = route?.params?.ArrayIndex;
    const dispatch = useDispatch();

    let dispatchCommentTotal: any = [];

    if (whichTypeScreen == "HomeScreen") {
        dispatchCommentTotal = useSelector((state: any) => state.HomePost_Store);
    }
    else if (whichTypeScreen == "OtherUserProfile") {
        dispatchCommentTotal = useSelector((state: any) => state.MyProfile_Store);
    }
    else if (whichTypeScreen == "SearchSinglePostView") {
        dispatchCommentTotal = useSelector((state: any) => state.SearchImagePost_Store);
    }
    else if (whichTypeScreen == "NotificationSinglePostView") {
        dispatchCommentTotal = useSelector((state: any) => state.NotificationImagePost_Store)
    }

    function Add_Comment(commentTotal: any) {

        if (whichTypeScreen == "HomeScreen") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) + 1;
            dispatch(HomePost_Action([...dispatchCommentTotal]));
        }
        if (whichTypeScreen == "OtherUserProfile") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) + 1;
            dispatch(MyProfile_Action([...dispatchCommentTotal]));
        }
        if (whichTypeScreen == "SearchSinglePostView") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) + 1;
            dispatch(SearchImagePost_Action([...dispatchCommentTotal]));
        }
        if (whichTypeScreen == "NotificationSinglePostView") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) + 1;
            dispatch(NotificationImagePost_Action([...dispatchCommentTotal]));
        }
    }
    function Delete_Comment(commentTotal: any) {
        console.log("Deleted");
        if (whichTypeScreen == "HomeScreen") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) - 1;
            dispatch(HomePost_Action([...dispatchCommentTotal]));
        }
        if (whichTypeScreen == "OtherUserProfile") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) - 1;
            dispatch(MyProfile_Action([...dispatchCommentTotal]));
        }
        if (whichTypeScreen == "SearchSinglePostView") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) - 1;
            dispatch(SearchImagePost_Action([...dispatchCommentTotal]));
        }
        if (whichTypeScreen == "NotificationSinglePostView") {
            dispatchCommentTotal[ArrayIndex].comments = parseInt(commentTotal) - 1;
            dispatch(NotificationImagePost_Action([...dispatchCommentTotal]));
        }
    }

    return (
        <Comment_Comp
            userPhoto={userPhoto}
            post_id={post_id}
            postUser_id={postUser_id}
            userName={userName}
            description={description}
            totalComment={totalComment}
            dispatchCommentTotal={dispatchCommentTotal}
            Add_Comment={(e: any) => Add_Comment(e)}
            Delete_Comment={(e: any) => Delete_Comment(e)}
        />
    )
}

export default Comment_Screen