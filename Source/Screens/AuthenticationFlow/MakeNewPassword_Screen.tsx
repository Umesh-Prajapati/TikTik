import { ImageBackground, StyleSheet, View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import Spacer_Space from '../../Utils/Spacer_Space'
import AuthCommon_Comp from '../../Components/AuthCommon_Comp'
import SubmitButton_Comp from '../../Components/SubmitButton_Comp'
import { AuthS_GS } from '../../Styles/AuthFlow/Comp_GlobalStyle'
import { BOTTOM_ELEM_BACK } from '../../assets/Images'

const MakeNewPassword_Screen = ({ navigation, route }: any) => {

    let { email , user_id } = route?.params

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loader, setLoader] = useState(false)

    async function callMakeNewPassword() {
        setLoader(true)

        if (newPassword !== confirmPassword) {
            setLoader(false)
            return (Alert.alert("Please Check Your Confirm Password..!"))
        }

        var formdata = new FormData();
        formdata.append("method", "set_new_password");
        formdata.append("user_id", user_id);
        formdata.append("email", email);
        formdata.append("password", newPassword);

        const resp = await FetchingData_Api("POST", 'login', formdata);

        if (resp?.status == 1) {
            navigation.navigate('ConfirmPassword')
            setLoader(false)
            // console.log("Make New Password..:", resp);
        } else {
            setLoader(false)
            Alert.alert(resp?.message)
            // console.log("Forgot Password:::", resp);
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={AuthS_GS.background}
                source={BOTTOM_ELEM_BACK}
                resizeMode='cover'>
            </ImageBackground>
            <Spacer_Space>
                <Text style={AuthS_GS.title}>Generate password</Text>
                <Text style={AuthS_GS.semiTitle}>Create a new password and please never share
                    anyone for safe use.</Text>
                <View style={AuthS_GS.container}>
                    <AuthCommon_Comp
                        Type={'password'}
                        labelName='New Password'
                        placeHolderName='*********123'
                        onChange={setNewPassword}
                    />
                    <AuthCommon_Comp
                        Type={'password'}
                        labelName='Confirm New Password'
                        placeHolderName='*********123'
                        onChange={setConfirmPassword}
                    />
                </View>
                <SubmitButton_Comp
                    loading={loader}
                    btnName='Update Password'
                    onSubmit={() => !loader ? callMakeNewPassword() : null}
                />
            </Spacer_Space>
        </View>
    );
};

export default MakeNewPassword_Screen