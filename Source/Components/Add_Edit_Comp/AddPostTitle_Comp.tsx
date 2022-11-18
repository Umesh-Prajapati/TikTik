import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const windowHeight = Dimensions.get('window').height;

const AddPostTitle_Comp = (props:any) => {

  const { multiline, value, placeHolderName, onChange, labelName } = props

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titleName} >{labelName}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          value={value || ''}
          autoCapitalize='none'
          multiline={multiline ? multiline : false}
          autoCorrect={false}
          placeholder={placeHolderName}
          onChangeText={onChange}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddPostTitle_Comp

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 13,
    backgroundColor: `rgb(246,246,246)`,
  },
  icon: {
    width: 20,
    height: 21,
  },
  input: {
    borderRadius: 10,
    maxHeight:windowHeight/8,
    width:'100%'
  },
  titleName: {
    color: `rgb(89,88,89)`,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 18,
    marginStart: 13,
    marginBottom: 9,
  },
})