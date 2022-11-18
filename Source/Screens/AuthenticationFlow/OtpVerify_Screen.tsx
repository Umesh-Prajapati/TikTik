import { ImageBackground, StyleSheet, View, Text, Alert, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import Spacer_Space from '../../Utils/Spacer_Space'

import OTPTextView from 'react-native-otp-textinput'
import SubmitButton_Comp from '../../Components/SubmitButton_Comp'
import { BOTTOM_ELEM_BACK } from '../../assets/Images'


const OtpVerify_Screen = ({ route, navigation } : any) => {

    const { email, user_id } = route.params
    const [otp, setOtp] = useState('')
    const [loader, setLoader] = useState(false)

    async function callResendOTP() {
        setLoader(true)
        var formdata = new FormData();
        formdata.append("method", "forgot_password");
        formdata.append("email", email);

        const resp = await FetchingData_Api("POST", 'login', formdata);

        if (resp?.status == 1) {
            Alert.alert(
                "OTP Resend",
                "otp resend successfully..",
                [
                    {
                        text: "OK"
                    }
                ]
            );
            // console.log("OTP Verify",resp);
            setLoader(false)
        } else {
            setLoader(false)
            Alert.alert(resp?.message)
            console.log("OTP Verify:::", resp);
        }

    }

    async function callOTPVerify() {
        
        setLoader(true)
        if (otp.length < 4) {
            setLoader(false)
            return Alert.alert("Please Full Fill OTP")
        }

        var formdata = new FormData();
        formdata.append("method", "verify_otp");
        formdata.append("user_id", user_id);
        formdata.append("email", email);
        formdata.append("otp", otp);

        const resp = await FetchingData_Api("POST", 'login', formdata)
        console.log(resp);
        if (resp?.status == 1) {
            navigation.navigate('MakeNewPassword_Screen', {
                email,
                user_id
            })
        } else {
            setLoader(false)
            Alert.alert(resp?.message)
            console.log("OTP Verify:::", resp);
        }
        setLoader(false)
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={styles.background}
                source={BOTTOM_ELEM_BACK}
                resizeMode='cover'>
            </ImageBackground>
            <Spacer_Space>
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.semiTitle}>Please enter the verification code :</Text>
                <View style={styles.container}>
                    <OTPTextView
                        textInputStyle={{ color: 'rgb(22,149,240)' }}
                        handleTextChange={setOtp}
                        offTintColor='rgb(22,149,240)'
                        tintColor='rgb(22,149,240)'
                        inputCount={6}
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => callResendOTP()}>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>Resend OTP</Text>
                    </View>
                </TouchableWithoutFeedback>
                <SubmitButton_Comp
                    loading={loader}
                    btnName='Verify OTP'
                    onSubmit={() => { !loader ? callOTPVerify() : null }}
                />
            </Spacer_Space>
        </View>
    )
}

export default OtpVerify_Screen

const styles = StyleSheet.create({

    container: {
        marginTop: '16%',
        marginBottom: '10%',
        alignItems: 'center',
    },

    title: {
        fontSize: 24,
        color: `rgb(89,88,89)`,
    },

    semiTitle: {
        fontSize: 16,
        color: `rgb(171,169,169)`,
        marginTop: 8,
    },
    background: {
        height: 200,
        aspectRatio: 1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
    },

})