import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import { Comp_GlobalStyle } from '../Styles/AuthFlow/Comp_GlobalStyle';

import RadioForm from 'react-native-simple-radio-button';


const Gender_Comp = (props:any) => {

  const { onChange, labelName, value } = props

  var radio_props = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
    { label: 'Other', value: 'O' }
  ];

  function selectValue(){
    if(value == '') return 0
    if(value == 'M') return 0
    if(value == 'F') return 1
    if(value == 'O') return 2
  }

  return (
    <View style={Comp_GlobalStyle.container}>
      <Text style={Comp_GlobalStyle.titleName} >{labelName}</Text>
      <View style={Comp_GlobalStyle.inputContainer}>
        <RadioForm
          radio_props={radio_props}
          initial={selectValue()}
          formHorizontal={false}
          buttonColor={'#2196f3'}
          animation
          onPress={(value:any) => {onChange(value)}}
        />
      </View>
    </View>
  )
}

export default Gender_Comp