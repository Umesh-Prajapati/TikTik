import { ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { FontS } from '../../Utils/FontSize';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const SimpleHeader_Comp = (props: any) => {

    const navigation = useNavigation()

    const { headerName, myProfile, notification, onSubmit } = props
    console.log(props);

    if (myProfile) {
        return (
            <View style={styles.MainContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileSettings_Screen')}>
                    <View style={styles.ImageContainer}>
                        <Ionicons name="ios-settings-outline" size={24} color="black"
                            style={styles.background}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.InnerContainer}><Text style={styles.titleText}>{headerName}</Text></View>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
            </View>
        )
    }

    if (notification) {
        return (
            <View style={styles.MainContainer}>
                <TouchableWithoutFeedback onPress={() => onSubmit()}>
                    <View style={styles.ImageContainer}>
                        <AntDesign name="delete" size={25} color="black" style={styles.background} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.InnerContainer}><Text style={styles.titleText}>{headerName}</Text></View>
                <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
            </View>
        )
    }

    return (
        <View style={styles.MainContainer}>
            <View style={styles.InnerContainer}><Text style={styles.titleText}>{headerName}</Text></View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6 }} />
        </View>
    )
}

export default SimpleHeader_Comp

const styles = StyleSheet.create({
    MainContainer: {
        height: '6%',
        width: '100%',
        backgroundColor: 'white',
        zIndex: 20
    },
    InnerContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: FontS(18),
        fontWeight: '500'
    },
    ImageContainer: {
        height: '100%',
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    background: {
        marginRight: 15,
        height: 25,
        aspectRatio: 1,
    },

})