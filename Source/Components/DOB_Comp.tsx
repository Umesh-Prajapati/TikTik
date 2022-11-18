import { Button, Dimensions, Image, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DobPicker from './DobPicker';
import dayjs from 'dayjs';
import { Comp_GlobalStyle } from '../Styles/AuthFlow/Comp_GlobalStyle';

type AndroidMode = 'date' | 'time';

const DOB_Comp = (props:any) => {

  const { placeHolderName, onChange, labelName, value } = props

  const [show, setShow] = useState(false);

  function onSelDate(date?:any) {
    setShow(false);
    const dateSample = dayjs(date).format('YYYY-MM-DD')
    onChange(dateSample);
  }

  return (
    <View style={Comp_GlobalStyle.container}>
      <Text style={Comp_GlobalStyle.titleName} >{labelName}</Text>
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={Comp_GlobalStyle.inputContainer}>
          <View style={Comp_GlobalStyle.input}>
            <Text>{value}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ flex: 1, }}>
        {show === true
          ? Platform.OS === "android"
            ? <RNDateTimePicker
              mode='date'
              value={value ? new Date(value) : (value || new Date())}
              onChange={(e : any, date :any) =>onSelDate(date)}
              themeVariant='light'
              style={{ width: 320, backgroundColor: 'grey' }}
            />
            :
            <DobPicker
              date={value ? new Date(value) : (value || new Date())}
              visible={show}
              onCancel={() => show && setShow(false)}
              onSelect={(date :any ) => onSelDate(date)}
            />
          : null
        }
      </View>
    </View>
  );
};



export default DOB_Comp

// const styles = StyleSheet.create({
//   container: {

//   },
//   inputContainer: {
//     flexDirection: 'row',
//     borderRadius: 10,
//     padding: 13,
//     backgroundColor: `rgb(246,246,246)`,
//   },
//   icon: {
//     width: 20,
//     height: 21,
//   },
//   input: {
//     flex: 1,
//     borderRadius: 10,
//   },
//   titleName: {
//     color: `rgb(89,88,89)`,
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 18,
//     marginStart: 13,
//     marginBottom: 9,
//   },
// })