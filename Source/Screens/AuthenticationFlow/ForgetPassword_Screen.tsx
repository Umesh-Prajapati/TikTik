import { Alert, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import Spacer_Space from '../../Utils/Spacer_Space'
import Email_Comp from '../../Components/Email_Comp'
import SubmitButton_Comp from '../../Components/SubmitButton_Comp'
import { BOTTOM_ELEM_BACK } from '../../assets/Images'
import { Forgot_Style } from '../../Styles/AuthFlow/Forgot_Style'
import AuthCommon_Comp from '../../Components/AuthCommon_Comp'

const ForgetPassword_Screen = ({ navigation }: any) => {

    const [email, setEmail] = useState<any>()
    const [loader, setLoader] = useState(false)

    async function callForgotPassword() {

        setLoader(true)
        var formdata = new FormData();
        formdata.append("method", "forgot_password");
        formdata.append("email", email);

        const resp = await FetchingData_Api("POST", 'login', formdata);

        if (resp?.status == 1) {
            Alert.alert(
                "OTP Send",
                "verify your OTP via Email..",
                [
                    {
                        text: "OK", onPress: () => {
                            navigation.navigate('OtpVerify_Screen', {
                                email: email,
                                user_id: resp?.data?.user_id
                            });
                        }
                    }
                ]
            );
            console.log(resp);
            setLoader(false)
        } else {
            setLoader(false)
            Alert.alert(resp?.message)
            console.log("Forgot Password:::", resp);
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={Forgot_Style.background}
                source={BOTTOM_ELEM_BACK}
                resizeMode='cover'>
            </ImageBackground>
            <Spacer_Space>
                <Text style={Forgot_Style.title}>Forgot password</Text>
                <Text style={Forgot_Style.semiTitle}>Please enter your email adress, You will
                    recieve to create new OTP via email.</Text>
                <View style={Forgot_Style.container}>
                    <AuthCommon_Comp
                        Type={'email'}
                        labelName='Email'
                        placeHolderName='abc@gmail.com'
                        onChange={setEmail}
                    />
                </View>
                <SubmitButton_Comp
                    loading={loader}
                    btnName='Send OTP'
                    onSubmit={() => !loader ? callForgotPassword() : null}
                />
            </Spacer_Space>
        </View>
    )
}

export default ForgetPassword_Screen
