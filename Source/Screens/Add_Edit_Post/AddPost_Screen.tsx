import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AddNewPhoto_Comp from '../../Components/Add_Edit_Comp/AddNewPhoto_Comp';
import Spacer_Space from '../../Utils/Spacer_Space';
import AddPostTitle_Comp from '../../Components/Add_Edit_Comp/AddPostTitle_Comp';
import SubmitButton_Comp from '../../Components/SubmitButton_Comp';
import { FetchingData_Api } from '../../Api/FetchingData_Api';

const AddPost_Screen = ({ navigation }:any) => {

    const user_id = useSelector((state:any) => state.UserProfile_Store.data.user_id)

    const [image_uri, setUri] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [postDescription, setPostDescription] = useState('')

    const [loading, setLoading] = useState(false)

    //-----------------------------------------------------------
    async function callAddPostApi() {
        setLoading(true)
        if (!image_uri || !postTitle) {
            return;
        }
        var formdata = new FormData();
        formdata.append("method", "set_post");
        formdata.append("attachments[0]", { uri: image_uri, type: 'image/jpg', name: 'image.jpg' });
        formdata.append("title", postTitle);
        formdata.append("description", postDescription);
        formdata.append("user_id", user_id);

        console.log("Add Image..::",);
        const resp = await FetchingData_Api("POST", 'post', formdata);
        console.log("Add Image..::",resp);
        if (resp?.status == 1) {
            Alert.alert(
                "New Post",
                "your post has been uploaded..",
                [
                    { text: "OK", onPress: () => navigation.goBack('Home',{routing:true}) }
                ]
            );
        }
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView behavior='position'>
            <ScrollView style={{ height: '100%' }}>
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
                        onSubmit={() => !loading ? callAddPostApi() : null}
                    />
                </Spacer_Space>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddPost_Screen