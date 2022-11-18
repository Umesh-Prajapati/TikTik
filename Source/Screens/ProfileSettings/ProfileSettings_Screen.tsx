import { Alert, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontS } from '../../Utils/FontSize'; 
import { useDispatch, useSelector } from 'react-redux';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import { UserProfile_Action, User_Login_Action } from '../../Redux_Actions/Dispatch_Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer_Space from '../../Utils/Spacer_Space';
import ProfileSettings_Comp from '../../Components/ProfileSettings/ProfileSettings_Comp';
import SubmitButton_Comp from '../../Components/SubmitButton_Comp';

const ProfileSettings_Screen = () => {

  const loginUser_id = useSelector((state:any) => state.UserProfile_Store.data.user_id)
  const globalState = useSelector((state:any) => state.UserProfile_Store)
  const dispatch = useDispatch();

  useEffect(() => {
    callGetUsersSettings();
  }, [])

  const [loader, setLoader] = useState<boolean>(false);

  const [privateLoader, setPrivateLoader] = useState<boolean>(false);
  const [onlineStatusLoader, setOnlineStatusLoader] = useState<boolean>(false);
  const [notificationLoader, setNotificationLoader] = useState<boolean>(false);

  const [privateEnable, setPrivateEnable] = useState<boolean>(false);
  const [onlineStatusEnable, setOnlineStatusEnable] = useState<boolean>(false);
  const [notificationEnable, setNotificationEnable] = useState<boolean>(false);

  console.log(privateEnable);

  async function callGetUsersSettings() {
    var formdata = new FormData();
    formdata.append("method", "get_user_settings");
    formdata.append("user_id", loginUser_id);
    const resp = await FetchingData_Api("POST", 'profile', formdata)
    if (resp?.status == 1) {
      console.log(resp);
      resp?.data?.profile == 0 ? setPrivateEnable(true) : setPrivateEnable(false)
      resp?.data?.activity == 1 ? setOnlineStatusEnable(true) : setOnlineStatusEnable(false)
      resp?.data?.notification == 1 ? setNotificationEnable(true) : setNotificationEnable(false)
    }
  }

  async function callPrivateEnableApi() {
    setPrivateLoader(true)
    var formdata = new FormData();
    formdata.append("method", "set_user_settings");
    formdata.append("user_id", loginUser_id);
    formdata.append("profile", !privateEnable ? '0' : '1');
    const resp = await FetchingData_Api("POST", 'profile', formdata)
    if (resp?.status == 1) {
      console.log(resp);
      setPrivateEnable(previousState => !previousState);
      const temp = globalState
      temp.data.settings.profile = resp.data.profile
      dispatch(UserProfile_Action(temp))
    }
    setPrivateLoader(false)
  }
  async function callOnlineStatusEnableApi() {
    setOnlineStatusLoader(true)
    var formdata = new FormData();
    formdata.append("method", "set_user_settings");
    formdata.append("user_id", loginUser_id);
    formdata.append("activity", !onlineStatusEnable ? '1' : '0');
    const resp = await FetchingData_Api("POST", 'profile', formdata)
    if (resp?.status == 1) {
      console.log("Activity", resp);
      setOnlineStatusEnable(previousState => !previousState)
      const temp = globalState
      temp.data.settings.activity = resp.data.activity
      dispatch(UserProfile_Action(temp))
    }
    setOnlineStatusLoader(false)
  }
  async function callNotificationEnableApi() {
    setNotificationLoader(true)
    var formdata = new FormData();
    formdata.append("method", "set_user_settings");
    formdata.append("user_id", loginUser_id);
    formdata.append("notification", !notificationEnable ? '1' : '0');

    const resp = await FetchingData_Api("POST", 'profile', formdata)
    if (resp?.status == 1) {
      console.log("Notification ", resp);
      setNotificationEnable(previousState => !previousState)
      const temp = globalState
      temp.data.settings.notification = resp.data.notification
      dispatch(UserProfile_Action(temp))
    }
    setNotificationLoader(false)
  }


  //LogOut
  //----------------------------------------------------------------------------
  async function doLogout() {
    Alert.alert(
      "Logout..!",
      "Are You Sure, You Wan't to Logout..?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            setLoader(true)
            var formdata = new FormData();
            formdata.append("method", 'do_logout');
            formdata.append("user_id", loginUser_id);
            try {
              const resp = await FetchingData_Api("POST", 'login', formdata)
              if (resp?.status == 1) {
                console.log("Logout:::", resp);
                await AsyncStorage.removeItem('@userDetails')
                dispatch(User_Login_Action(false));
                setLoader(false)
              } else {
                Alert.alert(resp.message)
              }
            } catch (e:any) {
              console.log("Logout:::", e.message)
            }
          }
        }
      ]
    );
  }
  //----------------------------------------------------------------------------

  return (
    <Spacer_Space>
      <ProfileSettings_Comp
        isLoader={privateLoader}
        name="Private"
        isEnabled={privateEnable}
        toggleSwitch={() => callPrivateEnableApi()}
      />
      <ProfileSettings_Comp
        isLoader={onlineStatusLoader}
        name="Online Status"
        isEnabled={onlineStatusEnable}
        toggleSwitch={() => callOnlineStatusEnableApi()}
      />
      <ProfileSettings_Comp
        isLoader={notificationLoader}
        name="Notification"
        isEnabled={notificationEnable}
        toggleSwitch={() => callNotificationEnableApi()}
      />
      <View style={{ marginTop: '3%' }}>
        <SubmitButton_Comp
          loading={loader}
          btnName='Logout'
          onSubmit={() => { !loader ? doLogout() : null }}
        />
      </View>
    </Spacer_Space>
  )
}

export default ProfileSettings_Screen

const styles = StyleSheet.create({
  SemiContainer: {
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  textName: {
    fontSize: FontS(20),
  },
})