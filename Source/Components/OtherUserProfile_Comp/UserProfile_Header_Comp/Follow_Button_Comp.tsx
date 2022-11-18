import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SingleBtn_Comp from '../SingleBtn_Comp';
import { FetchingData_Api } from '../../../Api/FetchingData_Api';

const Follow_Button_Comp = (props:any) => {

  const { user_2, loginUser_id, btnName, onSubmit } = props

  const [loading, setLoading] = useState(false);
    // console.log("-=-=-=><<-=-=-=-=",btnName);
  //---------------------------------------------------------------------------1
  async function doFollow() {
    setLoading(true)
    var formdata = new FormData();
    formdata.append("method", "do_follow");
    formdata.append("user_id", loginUser_id);
    formdata.append("user_2", user_2);

    const resp = await FetchingData_Api("POST", 'profile', formdata);
    if (resp?.status == 1) {
      onSubmit();
    }
    console.log("Do Follow...:::", resp);
    setLoading(false)
  }
  //---------------------------------------------------------------------------2
  async function unFollow() {
    var formdata = new FormData();
    formdata.append("method", "unfollow");
    formdata.append("user_id", loginUser_id);
    formdata.append("user_2", user_2);

    const resp = await FetchingData_Api("POST", 'profile', formdata);
    if (resp && resp?.status == 1) {
      onSubmit();
    }
    console.log("UnFollow...:::", resp);
  }
  //---------------------------------------------------------------------------3
  async function cancelFollowRequest() {
    setLoading(true)
    var formdata = new FormData();
    formdata.append("method", "cancel_follow_request");
    formdata.append("user_id", loginUser_id);
    formdata.append("user_2", user_2);

    console.log(".,.,.,.,.,.,.,,-=-=-", formdata);

    const resp = await FetchingData_Api("POST", 'profile', formdata);
    if (resp && resp?.status == 1) {
      onSubmit();
    }
    console.log("Cancel Follow request...:::", resp);
    setLoading(false)
  }
  //---------------------------------------------------------------------------4
  async function rejectFollowRequest() {
    var formdata = new FormData();
    formdata.append("method", "reject_follow_request");
    formdata.append("user_id", loginUser_id);
    formdata.append("user_2", user_2);

    const resp = await FetchingData_Api("POST", 'profile', formdata);
    if (resp && resp?.status == 1) {
      onSubmit();
    }
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    console.log("Reject Req...:::", resp);
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    onSubmit()
  }
  //---------------------------------------------------------------------------5
  async function acceptFollowRequest() {
    var formdata = new FormData();
    formdata.append("method", "accept_follow_request");
    formdata.append("user_id", loginUser_id);
    formdata.append("user_2", user_2);
    try {
      const resp = await FetchingData_Api("POST", 'profile', formdata);
      console.log("-=-=-=-=-=-=-=->>>", resp);
      if (resp?.status === 1) {
        onSubmit();
      }
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
      console.log("accept req...:::", resp);
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    } catch (e:any) {
      console.log("error on accept Request :::", e.message);
    }
  }

  function checkComponent() {
      if (btnName == 'Accept/Cancel') {
        return <>
          <SingleBtn_Comp btnName='Accept Request' onSubmit={() => acceptFollowRequest()} />
          <SingleBtn_Comp btnName='Decline Request' onSubmit={() => rejectFollowRequest()} />
        </>
      }else{
        if(btnName == 'Follow') return <SingleBtn_Comp loading={loading} btnName='Follow' onSubmit={() => doFollow()} />
        else if(btnName == 'UnFollow') return <SingleBtn_Comp loading={loading} btnName='UnFollow' onSubmit={() => unFollow()} />
        else if(btnName == 'Follow Back') return <SingleBtn_Comp loading={loading} btnName='Follow Back' onSubmit={() => doFollow()} />
        else if(btnName == 'Requested') return <SingleBtn_Comp loading={loading} btnName='Requested' onSubmit={() => cancelFollowRequest()} />
      }
  }

  return (
    <View style={styles.buttonsContainer}>
      {checkComponent()}
    </View>
  );
}

export default Follow_Button_Comp

const styles = StyleSheet.create({
  buttonsContainer: {
    marginVertical: "5%",
    flexDirection: 'row',
    // flex:1,
  },
})
