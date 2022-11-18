import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer_Space = ({ children }:any) => {
    return (
        <View style={styles.margin}>
            {children}
        </View>
    )
}

export default Spacer_Space

const styles = StyleSheet.create({
    margin: {
      flex: 1,
      margin: "2%",
      height: "100%",
    }
  })