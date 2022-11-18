import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Comp_GlobalStyle } from '../Styles/AuthFlow/Comp_GlobalStyle'

const FullName_Comp = (props:any) => {

    const { placeHolderName, onChange, labelName, value } = props

  return (
    <View style={Comp_GlobalStyle.container}>
      <Text style={Comp_GlobalStyle.titleName} >{labelName}</Text>
      <View style={Comp_GlobalStyle.inputContainer}>
        <TextInput style={Comp_GlobalStyle.input} 
        autoComplete='name'
        autoCorrect={false}
        placeholder={placeHolderName}
        onChangeText={onChange}
        value={value}
        />
      </View>
    </View>
  )
}

export default FullName_Comp
