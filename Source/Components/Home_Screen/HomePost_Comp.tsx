import { Dimensions, Platform, Image, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState, } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';

import { Home_Styles } from '../../Styles';

import ReportOnPost_Comp from '../GlobalComp/ReportOnPost_Comp';

import ReadMore from 'react-native-read-more-text';
import { FontS } from '../../Utils/FontSize';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import { ScrollView } from 'react-native-gesture-handler';

const windowHeight = Dimensions.get('window').height;

const HomePost_Comp = (props: any) => {

  const { data, navigation, callPostApi, loginUser_id, doDeletePost, index } = props

  useEffect(() => {
    reCall();
  }, [data])

  const { top, bottom } = useSafeAreaInsets();
  let h1 = Platform.OS == 'ios' ? top + bottom : 0;

  const refRBSheet = useRef<RBSheet | null>(null);
  const [likes, setLikes] = useState(parseInt(data?.likes));
  const [is_liked, setIs_Liked] = useState(data?.is_liked == 1 ? true : false)

  function reCall() {
    setIs_Liked(data?.is_liked == 1 ? true : false)
    setLikes(parseInt(data?.likes))
  }

  //--------------------------------------------------------------
  async function callLikeApi(p_id: any) {
    var formdata = new FormData();
    formdata.append("method", "like_post");
    formdata.append("post_id", p_id);
    formdata.append("user_id", loginUser_id);
    try {
      const resp = await FetchingData_Api("POST", 'post', formdata);
      if (resp.status == 1) {
        if (is_liked) {
          likes > 0 ? setLikes(likes - 1) : null
          setIs_Liked(false)
        } else {
          setLikes(likes + 1)
          setIs_Liked(true)
        }
      }
    } catch (e) {
      console.log("Error Log in Api Rerender..(FlatListComp):::", e);
    }
  }
  //--------------------------------------------------------------
  async function CallDeletePostApi(post_id: any, user_id: any) {
    var formdata = new FormData();
    formdata.append("method", "delete_post");
    formdata.append("post_id", post_id);
    formdata.append("user_id", user_id);

    const resp = await FetchingData_Api("POST", 'post', formdata)
    refRBSheet?.current?.close();
    if (resp?.status == 1) {
      doDeletePost();
    }
  }
  //--------------------------------------------------------------

  return (
    <View style={[Home_Styles.container, { height: windowHeight - h1 }]}>

      {data?.attachments[0]?.attachment
        ?
        <Image
          style={[Home_Styles.background, StyleSheet.absoluteFill]}
          source={{ uri: data?.attachments[data?.attachments.length - 1]?.attachment.toString() }}
          resizeMode='cover' />
        : null
      }

      <View style={Home_Styles.linearBg}>
        <LinearGradient style={Home_Styles.secondInnerContainer} colors={['transparent', 'rgba(0,0,0,.85)',]}>
          <View style={[Home_Styles.verticalContainer, { marginBottom: (windowHeight / 14) }]}>
            <Text style={Home_Styles.userName}>@{data.name}</Text>
            <Text style={Home_Styles.postTitle}>{data.title}</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={Home_Styles.descriptionView}
            >
              {
                data?.description?.length > 20
                  ? <ReadMore numberOfLines={undefined}>
                    <Text style={Home_Styles.postDescription}>{data?.description}</Text>
                  </ReadMore>
                  : <Text style={Home_Styles.postDescription}>{data.description}</Text>
              }
            </ScrollView>
          </View>

          <View style={[Home_Styles.horizontalContainer, { marginBottom: (windowHeight / 14) }]}>

            <TouchableOpacity onPress={() => { navigation.navigate('OtherUserProfile_Screen', { user_2: data.user_id }) }}>
              {data?.photo
                ? <Image source={{ uri: data.photo }} style={Home_Styles.profileImage} />
                : <Ionicons name="person-circle" size={FontS(60)} color="white" />
              }
            </TouchableOpacity>

            <TouchableWithoutFeedback onPress={() => { callLikeApi(data.post_id) }}>
              <View style={Home_Styles.imagesContainer}>
                {
                  !is_liked
                    ? <Ionicons name="heart-outline" size={FontS(40)} color="white" />
                    : <Ionicons name="heart-sharp" size={FontS(40)} color="#ff555f" />
                }
                <Text style={{ color: 'white' }}>{likes}</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Comment_Screen', {
              ArrayIndex: index,
              whichTypeScreen: 'HomeScreen',
              userPhoto: data.photo,
              postUser_id: data.user_id,
              post_id: data.post_id,
              comments: data.comments,
              userName: data.name,
              description: data.description,
              totalComment: data?.comments
            })} >

              <View style={Home_Styles.imagesContainer}>
                <FontAwesome name="commenting" size={FontS(32)} color="white" adjustsFontSizeToFit={true} allowFontScaling style={{}} />
                <Text style={{ color: 'white' }}>{data.comments}</Text>
              </View>

            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => refRBSheet.current?.open()}>

              <View style={Home_Styles.imagesContainer}>
                <Entypo name="dots-three-vertical" size={FontS(32)}  color="white" />
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
          data.user_id == loginUser_id
            ? <View>
              <ButtonComp
                btnName='Edit Post'
                onSubmit={() => {
                  refRBSheet.current?.close()
                  navigation.navigate('EditPost_Screen',
                    {
                      index: index,
                      user_id: loginUser_id,
                      post_id: data.post_id,
                      img_uri: data?.attachments[0]?.attachment || '',
                      title: data.title,
                      description: data.description,
                      whichScreen: 'HomeScreen'
                    })
                }} />
              <ButtonComp
                btnName='Delete Post'
                onSubmit={() => { CallDeletePostApi(data.post_id, loginUser_id) }} />
            </View>
            : <KeyboardAvoidingView>
              <ReportOnPost_Comp
                user_id={loginUser_id}
                post_id={data.post_id}
                closeBtmSheet={() => { refRBSheet.current?.close() }}
              />
            </KeyboardAvoidingView>
        }
      </RBSheet>
    </View>
  )
}

export default HomePost_Comp

const ButtonComp = (props: any) => {
  const { btnName, onSubmit } = props
  return (
    <View style={Home_Styles.btnContainer}>
      <TouchableOpacity style={Home_Styles.btn} onPress={() => { onSubmit() }}>
        <Text style={Home_Styles.btnText}>{btnName}</Text>
      </TouchableOpacity>
    </View>
  );
}