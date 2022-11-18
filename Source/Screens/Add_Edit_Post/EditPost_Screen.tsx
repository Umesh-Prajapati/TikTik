import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import { HomePost_Action, MyProfile_Action, NotificationImagePost_Action, SearchImagePost_Action } from '../../Redux_Actions/Dispatch_Actions';
import Spacer_Space from '../../Utils/Spacer_Space';
import AddNewPhoto_Comp from '../../Components/Add_Edit_Comp/AddNewPhoto_Comp';
import AddPostTitle_Comp from '../../Components/Add_Edit_Comp/AddPostTitle_Comp';
import SubmitButton_Comp from '../../Components/SubmitButton_Comp';

const EditPost_Screen = ({ route, navigation }: any) => {

  const dispatch = useDispatch();

  const { user_id, post_id, navigate, index, whichScreen } = route.params

  let data: any = [];

  if (whichScreen == 'HomeScreen') data = useSelector((state:any) => state.HomePost_Store)
  if (whichScreen == 'OtherUserProfile') data = useSelector((state:any) => state.MyProfile_Store)
  if (whichScreen == 'SearchSinglePostView') data = useSelector((state: any) => state.SearchImagePost_Store);
  if (whichScreen == 'NotificationSinglePostView') data = useSelector((state: any) => state.NotificationImagePost_Store);

  const [image_uri, setUri] = useState<any>(data[index]?.attachments[data[index]?.attachments?.length - 1]?.attachment || '')
  const [postTitle, setPostTitle] = useState(data[index]?.title || '')
  const [postDescription, setPostDescription] = useState(data[index]?.description || '')

  const [loading, setLoading] = useState(false)

  //-----------------------------------------------------------
  async function callAddPostApi() {
    setLoading(true)
    // console.log("image Uri:::", image_uri);
    if (!image_uri || !postTitle) {
      return;
    }
    console.log(post_id);
    var formdata = new FormData();
    formdata.append("method", "set_post");
    formdata.append("attachments[0]", { uri: image_uri, type: 'image/jpg', name: 'image.jpg' });
    formdata.append("title", postTitle);
    formdata.append("description", postDescription);
    formdata.append("user_id", user_id);
    if (post_id) {
      // formdata.append("previous_attachments", post_id)
      formdata.append("post_id", post_id)
    }
    const resp = await FetchingData_Api("POST", 'post', formdata);
    try {
      if (resp.status === 1) {
        console.log("-=-=-=-=-=title=-=-=-=-=-=-=::", data[index].attachments);
        data[index].attachments[data[index].attachments.length - 1].attachment = image_uri;
        data[index].description = postDescription;
        data[index].title = postTitle;

        if (whichScreen == 'HomeScreen') {
          dispatch(HomePost_Action([...data]))
        }
        if (whichScreen == 'OtherUserProfile') {
          dispatch(MyProfile_Action([...data]))
        }
        if (whichScreen == 'SearchSinglePostView') {
          dispatch(SearchImagePost_Action([...data]))
        }
        if (whichScreen == 'NotificationSinglePostView') {
          dispatch(NotificationImagePost_Action([...data]))
        }

        // console.log(JSON.stringify(resp.data, null, 3));
        Alert.alert(
          "Post Details",
          "your post details has been updated..",
          [
            {
              text: "OK", onPress: () => navigate ? navigation.navigate(navigate, {
                indexNew: index, objNew: {
                  img: resp.data.attachments[0].attachment,
                  postTitle: resp.data.title, description: resp.data.description,
                }
              }) : navigation.goBack()
            }
          ]
        );
      }
    } catch (e:any) {
      console.log("Home Screen / Other Screen, Post Update Error==>", e.message);
    }
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior='position' style={{ height: "100%" }}>
      <ScrollView>
        <Spacer_Space>
          <AddNewPhoto_Comp
            myProfile={false}
            onSubmit={(e:any) => setUri(e)}
            photoUrl={image_uri}
          />
          <View>
            <AddPostTitle_Comp
              value={postTitle}
              labelName='Post Title'
              placeHolderName='Add Post Title....'
              onChange={setPostTitle} />
            <AddPostTitle_Comp
              value={postDescription}
              labelName='Post Description'
              placeHolderName='Add Post Description....'
              multiline={true}
              onChange={setPostDescription} />
          </View>
          <SubmitButton_Comp
            loading={loading}
            btnName='Share Post'
            onSubmit={() => callAddPostApi()}
          />
        </Spacer_Space>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditPost_Screen