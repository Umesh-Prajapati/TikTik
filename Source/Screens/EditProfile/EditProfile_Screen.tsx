import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import { UserProfile_Action } from '../../Redux_Actions/Dispatch_Actions'
import Spacer_Space from '../../Utils/Spacer_Space'
import AddNewPhoto_Comp from '../../Components/Add_Edit_Comp/AddNewPhoto_Comp'
import AuthCommon_Comp from '../../Components/AuthCommon_Comp'
import Gender_Comp from '../../Components/Gender_Comp'
import DOB_Comp from '../../Components/DOB_Comp'
import SubmitButton_Comp from '../../Components/SubmitButton_Comp'
import { Login_Style } from '../../Styles/AuthFlow/Login_Style'

const EditProfile_Screen = ({ navigation }: any) => {

    const data = useSelector((state: any) => state.UserProfile_Store.data)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState();
    const [fullName, setFullName] = useState(data.name);
    const [postBio, setPostBio] = useState(data.bio)
    const [email, setEmail] = useState(data.email);
    const [phoneNumber, setPhoneNumber] = useState(data.mobile);
    const [gender, setGender] = useState(data.gender);
    const [dob, setDob] = useState(data.dob);
    const [photo, setPhoto] = useState(data.photo);

    async function callSetProfile() {
        setLoading(true)
        var formdata = new FormData();
        formdata.append("method", "set_profile");
        formdata.append("user_id", data.user_id);
        formdata.append("name", fullName);
        formdata.append("mobile", phoneNumber);
        formdata.append("email", email);
        formdata.append("gender", gender);
        formdata.append("dob", dob);
        formdata.append("bio", postBio);
        formdata.append("photo", { uri: photo.toString(), type: 'image/jpg', name: 'image.jpg' });
        // console.log(":::",formdata);
        try {
            const resp = await FetchingData_Api("POST", "profile", formdata).catch((e) => console?.log(e));
            console.log(resp);
            if (resp?.data && resp?.status == 1) {
                // console.log("respppp::::", resp);
                setLoading(true)
                dispatch(UserProfile_Action(resp));
                Alert.alert(
                    "Profile Update",
                    "your profile has been updated..",
                    [
                        { text: "OK", onPress: () => navigation.goBack() }
                    ]
                );
            }
        } catch (e: any) {
            setLoading(true)
            console.log("editProfileError:::", e.message);
        }
    }

    return (
        <ScrollView>
            <Spacer_Space>
                <AddNewPhoto_Comp
                    myProfile={true}
                    onSubmit={(e: any) => setPhoto(e)}
                    photoUrl={photo}
                />
                <AuthCommon_Comp
                    Type="fullName"
                    labelName='Full Name'
                    placeHolderName='xyz'
                    onChange={setFullName}
                    value={fullName}
                />
                <AuthCommon_Comp
                    Type="multiline"
                    labelName='Bio'
                    placeHolderName='Bio..'
                    multiline={true}
                    onChange={setPostBio}
                    value={postBio}
                />
                <AuthCommon_Comp
                    Type="email"
                    labelName='Email'
                    placeHolderName='abc@gmail.com'
                    onChange={setEmail}
                    value={email}
                />
                <AuthCommon_Comp
                    Type="number"
                    labelName='Phone Number'
                    placeHolderName='+91 99999 99999'
                    onChange={setPhoneNumber}
                    value={phoneNumber}
                />
                <Gender_Comp
                    labelName='Gender'
                    placeHolderName='Gender'
                    onChange={setGender}
                    value={gender}
                />
                <DOB_Comp
                    labelName='Date of birth'
                    placeHolderName='YYYY-MM-DD'
                    onChange={setDob}
                    value={dob}
                />
                {error ? <Text style={Login_Style.error_msg}>{error}</Text> : null}
                <SubmitButton_Comp
                    loading={loading}
                    btnName='Update Details'
                    onSubmit={() => { callSetProfile() }}
                />
            </Spacer_Space>
        </ScrollView>
    )
}

export default EditProfile_Screen
