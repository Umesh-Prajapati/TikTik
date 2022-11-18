import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SubmitButton_Comp = (props:any) => {

  const { btnName, onSubmit, loading } = props

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.btn} onPress={()=>{onSubmit()}}>
        {
          loading || false
          ?<ActivityIndicator size={'small'} color='white'/>
          :<Text style={styles.btnText}>{btnName}</Text>
        }
      </TouchableOpacity>
    </View>
  );
}

export default SubmitButton_Comp

const styles = StyleSheet.create({
  btnContainer:{
    marginTop:'4%',
    alignSelf:'center'
  },
  btn:{
    height:45,
    width:240,
    backgroundColor:`rgb(22,149,240)`,
    borderRadius:10,
    justifyContent:'center',
    shadowColor:`rgba(89,88,89,0.83)`,
    shadowOffset: { width: 0, height: 1, blur:4 },
    // shadowOpacity: 0.4,
  },
  btnText:{
    color:'white',
    textAlign:'center',
    fontWeight:'600',
  },

})