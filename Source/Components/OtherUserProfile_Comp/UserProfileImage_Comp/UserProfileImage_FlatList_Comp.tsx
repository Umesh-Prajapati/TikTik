import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FetchingData_Api } from "../../../Api/FetchingData_Api";
import { OtherProfile_Styles } from "../../../Styles";
import { FontS } from "../../../Utils/FontSize";
import ReportOnPost_Comp from "../../GlobalComp/ReportOnPost_Comp";
import SubmitButton_Comp from "../../SubmitButton_Comp";

const windowWidth = Dimensions.get("window").width;

const UserProfileImage_FlatList_Comp = (props: any) => {
  
  const { item, navigation, loginUser_id, doLike, doDeletePost, index } = props;

  const [LineNo, setLineNo] = useState<any>(2);
  const refRBSheet = useRef();

  //--------------------------------------------------------------
  async function callLikeApi() {
    var formdata = new FormData();
    formdata.append("method", "like_post");
    formdata.append("post_id", item.post_id);
    formdata.append("user_id", loginUser_id);
    try {
      const resp = await FetchingData_Api("POST", "post", formdata);
      if (resp?.status == 1) {
        doLike();
      }
    } catch (e) {
      console.log("Error Log in Api Rerender-=User_Image-FlateList..:::", e);
    }
  }
  //--------------------------------------------------------------
  async function CallDeletePostApi() {
    var formdata = new FormData();
    formdata.append("method", "delete_post");
    formdata.append("post_id", item.post_id);
    formdata.append("user_id", loginUser_id);

    try {
      const resp = await FetchingData_Api("POST", "post", formdata);
      // console.log("likeuid::", resp);
      if (resp.status == 1) {
        doDeletePost();
        refRBSheet.current.close();
      }
    } catch (e) {
      console.log("Error Log in Api Rerender..:::", e);
    }
  }
  //--------------------------------------------------------------

  function checkMore() {
    if (LineNo !== undefined) {
      if (item.description.length > 40) {
        return (
          <>
            <TouchableWithoutFeedback onPress={() => setLineNo(undefined)}>
              <View>
                <Text style={{ color: "grey" }}>...more</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        );
      }
    }
  }

  const { top, bottom } = useSafeAreaInsets();
  let h1 = top + bottom;

  return (
    <View style={OtherProfile_Styles.MainContainer}>
      <View style={OtherProfile_Styles.ProfileNameContainer}>
        {item?.photo ? (
          <Image style={OtherProfile_Styles.ImageComp_profileImage} source={{ uri: item?.photo }} />
        ) : (
          <Ionicons name="person-circle" size={FontS(42)} color="black" />
        )}
        <View style={OtherProfile_Styles.NameTextContainer}>
          <Text>{item.name}</Text>
        </View>
        <View style={OtherProfile_Styles.Menu}>
          <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
            <Entypo name="dots-three-vertical" size={FontS(20)} color="Black" /* style={OtherProfile_Styles.elementImage} */  />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={OtherProfile_Styles.ImageContainer}>
        {item?.attachments?.length >= 0 ? (
          <Image
            style={OtherProfile_Styles.ContentImage}
            source={{
              uri: item?.attachments[item?.attachments.length - 1]?.attachment,
            }}
          />
        ) : null}
      </View>
      <View style={OtherProfile_Styles.LikeCommentContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            callLikeApi();
          }}
        >
          <View>
            {item.is_liked == "0" ? (
              <Ionicons name="heart-outline" size={FontS(30)} color="black" />
            ) : <Ionicons name="heart-sharp" size={FontS(30)} color="#ff555f" />}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Comment_Screen", {
                userPhoto: item.photo,
                postUser_id: item.user_id,
                post_id: item.post_id,
                comments: item.comments,
                userName: item.name,
                description: item.description,
                totalComment: item?.comments,
                // ArrayIndex : index,
              })
            }
          >
            <View>
              <FontAwesome name="commenting" size={FontS(30)} color="Black" style={{marginHorizontal:10}} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={OtherProfile_Styles.DescriptionContainer}>
        <View>
          {item?.description?.length > 0 ? (
            <>
              <Text numberOfLines={LineNo}>
                <Text style={{ fontWeight: "500" }}>{item.name}</Text>{" "}
                {item.description}
              </Text>
              {checkMore()}
            </>
          ) : null}
        </View>

        <View>
          {item.comments !== "0" ? (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("Comment_Screen", {
                  userPhoto: item?.photo,
                  postUser_id: item?.user_id,
                  post_id: item?.post_id,
                  userName: item?.name,
                  description: item?.description,
                  totalComment: item?.comments,
                  ArrayIndex: index,
                })
              }
            >
              <View>
                <Text style={OtherProfile_Styles.CommentTotal}>
                  View all {item.comments} comments
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ) : null}
          <Text style={OtherProfile_Styles.PostTimer}>{dayjs(item.reg_date).fromNow()}</Text>
        </View>
      </View>
      <View style={{ flex: 1, width: windowWidth }}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask
          closeOnPressBack
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          {item.user_id == loginUser_id ? (
            <View>
              <SubmitButton_Comp
                btnName="Edit Post"
                onSubmit={() => {
                  refRBSheet.current.close();
                  navigation.navigate("EditPost_Screen", {
                    user_id: loginUser_id,
                    post_id: item?.post_id,
                    navigate: "MyProfile",
                    index: index,
                    whichScreen: "OtherUserProfile",
                  });
                }}
              />
              <SubmitButton_Comp
                btnName="Delete Post"
                onSubmit={() => {
                  CallDeletePostApi();
                }}
              />
            </View>
          ) : (
            <KeyboardAvoidingView>
              <ReportOnPost_Comp
                user_id={loginUser_id}
                post_id={item.post_id}
                closeBtmSheet={() => {
                  refRBSheet.current.close();
                }}
              />
            </KeyboardAvoidingView>
          )}
        </RBSheet>
      </View>
    </View>
  );
};

export default UserProfileImage_FlatList_Comp;  