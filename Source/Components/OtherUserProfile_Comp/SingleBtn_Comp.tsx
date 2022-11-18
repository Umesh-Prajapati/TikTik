import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontS } from '../../Utils/FontSize'; 

const windowHeight = Dimensions.get('window').height;

const SingleBtn_Comp = (props:any) => {

    const { onSubmit, btnName, loading } = props

    return (
        <View style={styles.btn1}>
            <TouchableOpacity style={styles.btnView} onPress={() => !loading && onSubmit()}>
                {loading
                    ? <ActivityIndicator size={'small'} color='white' />
                    : <Text style={styles.btnName}>{btnName}</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default SingleBtn_Comp

const styles = StyleSheet.create({
    btn1: {
        flex: 1,
        marginRight: '2%',
    },
    btn2: {
        // flex: 1,
    },
    btnView: {
        borderRadius: 100,
        height: windowHeight / 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(22,149,240)',
    },
    btnName: {
        fontSize: FontS(13),
        color: 'white',
        fontWeight: '600',
    },
})