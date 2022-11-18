import { Alert, Image, ImageBackground, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchingData_Api } from '../../Api/FetchingData_Api';

import Spacer_Space from '../../Utils/Spacer_Space';
import { LOGO, TOP_ELEM_BACK } from '../../assets/Images';
import { Login_Style } from '../../Styles/AuthFlow/Login_Style';
import SubmitButton_Comp from '../../Components/SubmitButton_Comp';
import AuthCommon_Comp from '../../Components/AuthCommon_Comp';

import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Action, User_Login_Action } from '../../Redux_Actions/Dispatch_Actions';


const Login_Screen = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('ankush@gmail.com');
    const [password, setPassword] = useState<string>('123456789');

    const [loading, setLoading] = useState<boolean>(false);

    async function callApi() {
        setError(null)
        setLoading(true)
        var formdata = new FormData();
        formdata.append("method", "do_login");
        formdata.append("username", email);
        formdata.append("password", password);

        try {
            const response = await FetchingData_Api("POST", 'login', formdata)
            // console.log("Login Responce ::: ", response);
            if (response.status == 1) {
                const jsonValue = JSON.stringify(response)
                await AsyncStorage.setItem('@userDetails', jsonValue);
                console.log("<-=-=-LoginSuccess-=-=->");
                dispatch(UserProfile_Action(response));
                dispatch(User_Login_Action(true));
            }
            else {
                if (response.message) {
                    setError(response.message)
                } else {
                    Alert.alert("Please Try Again.!")
                }
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false)
    }

    return (
        <View style={Login_Style.mainContainer}>
            <ImageBackground
                style={Login_Style.background}
                source={TOP_ELEM_BACK}
                resizeMode='cover'>
            </ImageBackground>

            <ScrollView style={{ height: '100%', paddingTop: '30%' }}>

                <View style={Login_Style.logoContainer}>
                    <Image style={Login_Style.logo} source={LOGO} />
                </View>

                <Spacer_Space>
                    <AuthCommon_Comp
                        Type={'email'}
                        value={email}
                        labelName='Email'
                        placeHolderName='abc@gmail.com'
                        onChange={setEmail}
                    />
                    <AuthCommon_Comp
                        Type={'password'}
                        value={password}
                        labelName='Password'
                        placeHolderName='*********'
                        onChange={setPassword}
                    />

                    {error ? <Text style={Login_Style.error_msg}>{error}</Text> : null}

                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgetPassword_Screen')}>
                            <View>
                                <Text style={Login_Style.forgot}>Forgot Password ?</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <SubmitButton_Comp
                        loading={loading}
                        btnName='Sign In'
                        onSubmit={() => { callApi() }}
                    />

                </Spacer_Space>
                <View style={Login_Style.signInContainer}>
                    <Text>Don't have an account?</Text><Text style={Login_Style.signIn} onPress={() => navigation.navigate('SignUpScreen')}>Sign Up</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login_Screen