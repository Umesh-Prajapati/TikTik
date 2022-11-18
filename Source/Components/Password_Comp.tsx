import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Comp_GlobalStyle } from '../Styles/AuthFlow/Comp_GlobalStyle'

const Password_Comp = (props:any) => {

    const { value, placeHolderName, onChange, labelName } = props

  return (
    <View style={Comp_GlobalStyle.container}>
      <Text style={Comp_GlobalStyle.titleName} >{labelName}</Text>
      <View style={Comp_GlobalStyle.inputContainer}>
        <TextInput style={Comp_GlobalStyle.input} 
        value={value}
        autoCorrect={false}
        autoComplete='password'
        autoCapitalize='none'
        secureTextEntry={true}
        placeholder={placeHolderName}
        onChangeText={onChange}
        />
      </View>
    </View>
  )
}

export default Password_Comp

// const styles = StyleSheet.create({
//   container:{

//   },
//   inputContainer: {
//     flexDirection: 'row',
//     borderRadius: 10,
//     // padding: 13,
//     backgroundColor: `rgb(246,246,246)`,
//   },
//   icon: {
//     width: 20,
//     height: 21,
//   },
//   input: {
//     flex: 1,
//     borderRadius: 10,
//     padding:13,
//   },
//   titleName: {
//     color:`rgb(89,88,89)`,
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop:18,
//     marginStart: 13,
//     marginBottom: 9,
//   },
// })