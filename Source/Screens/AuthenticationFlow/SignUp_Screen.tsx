import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Spacer_Space from '../../Utils/Spacer_Space';
import dayjs from 'dayjs';
import Password_Comp from '../../Components/Password_Comp';
import Gender_Comp from '../../Components/Gender_Comp';
import DOB_Comp from '../../Components/DOB_Comp';
import SubmitButton_Comp from '../../Components/SubmitButton_Comp';
import { FetchingData_Api } from '../../Api/FetchingData_Api';
import AuthCommon_Comp from '../../Components/AuthCommon_Comp';
import { Login_Style } from '../../Styles/AuthFlow/Login_Style';

const SignUp_Screen = ({ navigation }: any) => {

  const [error, setError] = useState<any>();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState('M');

  const [loading, setLoading] = useState(false);

  const currentDate = dayjs(new Date()).format('YYYY-MM-DD')
  const [dob, setDob] = useState(currentDate);

  async function apiCall() {
    setError(null)
    if (!email || !password || !fullName || !dob || !gender) {
      return setError("Please Fill Blanks..!!!")
    }
    setLoading(true)
    var formdata = new FormData();
    formdata.append("method", "do_register");
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("name", fullName);
    formdata.append("dob", dob);
    formdata.append("gender", gender);
    
    const response = await FetchingData_Api("POST", 'signup', formdata)
    if (response.status == 1) {
      Alert.alert("Your Account is Created, Please Login Your Account..")
      navigation.navigate('LoginScreen')
    } else {
      if (response.message) {
        setError(response.message)
      } else {
        Alert.alert("Please Try Again.!")
      }
    }
    setLoading(false)
  }
  
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding'>
        <Spacer_Space>
          <AuthCommon_Comp
            Type={'fullName'}
            labelName='Full Name'
            placeHolderName='xyz'
            onChange={setFullName}
          />
          <AuthCommon_Comp
            Type={'email'}
            labelName='Email'
            placeHolderName='abc@gmail.com'
            onChange={setEmail}
          />
          <AuthCommon_Comp
            Type={'password'}
            labelName='Password'
            placeHolderName='*********'
            onChange={setPassword}
          />
          <Gender_Comp
            labelName='Gender'
            placeHolderName='Gender'
            onChange={setGender}
          />
          <DOB_Comp
            labelName='Date of birth'
            placeHolderName='YYYY-MM-DD'
            onChange={(date: any) => setDob(date)}
            value={dob}
          />
          {error ? <Text style={Login_Style.error_msg}>{error}</Text> : null}
          <SubmitButton_Comp
            loading={loading}
            btnName='Sign Up'
            onSubmit={() => { apiCall() }}
          />
        </Spacer_Space>
      </KeyboardAvoidingView>
    </ScrollView>

  )
}

export default SignUp_Screen
