import { ActivityIndicator, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', alignSelf:'center', width:400}}>
        <ActivityIndicator size={'large'} />
    </View>
  )
}

export default index