import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface Props {
    visible: boolean;
    onSelect: (event: DateTimePickerEvent, date?: Date) => void;
    onCancel?: () => void;
    date: Date;
}

const DobPicker = ({ visible, onSelect, onCancel, date }: Props) => {
    const [dob, setDob] = useState<any>(date);
    return (
        <Modal visible={visible} transparent={true} onRequestClose={onCancel} animationType='fade'>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.gPickerV}>
                    <TouchableWithoutFeedback>
                        <View style={styles.gPicker}>
                            <View style={{alignSelf:'flex-end', flexDirection:'row'}}>
                                <Text style={{color:'blue', marginHorizontal:'2%'}}
                                onPress={()=>onSelect(dob)} >OK</Text>
                                <Text style={{color:'blue', marginHorizontal:'2%'}}
                                onPress={()=>onCancel()} >CANCEL</Text>
                            </View>
                            <RNDateTimePicker
                                mode='date'
                                value={dob}
                                onChange={(e,date)=>setDob(date)}
                                themeVariant={"light"}
                                display='spinner'
                                style={{ width: '100%' }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
export default DobPicker

const styles = StyleSheet.create({
    gPicker: {
        width: "100%",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "white",
    },
    gPickerV: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.5)",
    },
})