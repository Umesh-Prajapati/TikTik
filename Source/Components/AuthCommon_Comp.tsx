import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Comp_GlobalStyle } from '../Styles/AuthFlow/Comp_GlobalStyle'

const AuthCommon_Comp = (props: any) => {

    const { Type, value, placeHolderName, onChange, labelName, multiline } = props

    function inputType() {
        if (Type == 'email') {
            return <TextInput style={Comp_GlobalStyle.input}
                value={value}
                autoCapitalize='none'
                autoComplete='email'
                autoCorrect={false}
                placeholder={placeHolderName}
                onChangeText={onChange}
            />
        }
        else if (Type == 'fullName') {
            return <TextInput style={Comp_GlobalStyle.input}
                autoComplete='name'
                autoCorrect={false}
                placeholder={placeHolderName}
                onChangeText={onChange}
                value={value}
            />
        }
        else if (Type == 'password') {
            return <TextInput style={Comp_GlobalStyle.input}
                value={value}
                autoCorrect={false}
                autoComplete='password'
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder={placeHolderName}
                onChangeText={onChange}
            />
        }
        else if (Type == 'multiline') {
            return <TextInput style={Comp_GlobalStyle.input}
                value={value || ''}
                autoCapitalize='none'
                multiline={multiline ? multiline : false}
                autoCorrect={false}
                placeholder={placeHolderName}
                onChangeText={onChange}
            />
        }
        else if (Type == 'number') {
            return <TextInput style={Comp_GlobalStyle.input}
                value={value || ''}
                autoCapitalize='none'
                autoComplete='cc-number'
                keyboardType='number-pad'
                autoCorrect={false}
                placeholder={placeHolderName}
                onChangeText={onChange}
                maxLength={10}
            />
        }
        else if (Type == '') {
            return
        }
    }

    return (
        <View style={Comp_GlobalStyle.container}>
            <Text style={Comp_GlobalStyle.titleName} >{labelName}</Text>
            <View style={Comp_GlobalStyle.inputContainer}>
                {inputType()}
            </View>
        </View>
    )
}

export default AuthCommon_Comp

const styles = StyleSheet.create({})