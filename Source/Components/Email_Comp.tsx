import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Comp_GlobalStyle } from '../Styles/AuthFlow/Comp_GlobalStyle'

const Email_Comp = (props:any) => {

  const { value, placeHolderName, onChange, labelName } = props

  return (
    <View style={Comp_GlobalStyle.container}>
      <Text style={Comp_GlobalStyle.titleName} >{labelName}</Text>
      <View style={Comp_GlobalStyle.inputContainer}>
        <TextInput style={Comp_GlobalStyle.input}
          value={value}
          autoCapitalize='none'
          autoComplete='email'
          autoCorrect={false}
          placeholder={placeHolderName}
          onChangeText={onChange}
        />
      </View>
    </View>
  )
}

export default Email_Comp
