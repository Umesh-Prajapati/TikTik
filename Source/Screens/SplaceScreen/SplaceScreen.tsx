import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { TOP_ELEM_BACK, BOTTOM_ELEM_BACK, LOGO, LOGO_TEXT } from '../../assets/Images/index'

const SplaceScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={TOP_ELEM_BACK}
        style={{ height: 200, aspectRatio: 1, position: 'absolute', top: 0, left: 0, }}
      />
      <ImageBackground
        source={BOTTOM_ELEM_BACK}
        style={{ height: 200, aspectRatio: 1, position: 'absolute', bottom: 0, right: 0 }}
      />
      <View style={{
        height: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
        alignSelf: 'center'
      }}>
        <Text style={{ marginBottom: 100 }}>Version 1.0.0</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Image source={LOGO} resizeMode='contain'
          style={{ height: '15%', aspectRatio: 1 }} />
        <Image source={LOGO_TEXT} resizeMode='contain'
          style={{ width: '25%', height: '6%', }} />
      </View>
    </View>
  );
}

export default SplaceScreen