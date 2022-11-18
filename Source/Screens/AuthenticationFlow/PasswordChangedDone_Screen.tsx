import { ImageBackground, StyleSheet, View, Text, Alert, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import Spacer_Space from '../../Utils/Spacer_Space';
import SubmitButton_Comp from '../../Components/SubmitButton_Comp';
import { BOTTOM_ELEM_BACK, SUCCESS_IMG } from '../../assets/Images';

const windowWidth = Dimensions.get('window').width;

const PasswordChangedDone_Screen = ({ navigation }: any) => {

    return (
        <View style={{ flex: 1, height: '100%' }}>
            <ImageBackground
                style={styles.background}
                source={BOTTOM_ELEM_BACK}
                resizeMode='cover'>
            </ImageBackground>
            <View style={styles.ImageContainer}>
                <ImageBackground
                    style={styles.CenterImage}
                    source={SUCCESS_IMG}
                    resizeMode='contain'>
                </ImageBackground>
            </View>
            <Spacer_Space>
                <Text style={styles.title}>Password Changed</Text>
                <Text style={styles.semiTitle}>Congratulations You’ve successfully
                    changed your password.</Text>
                <View style={{ marginTop: '120%' }}>
                    <SubmitButton_Comp
                        btnName='Back To Login'
                        onSubmit={() => navigation.popToTop('LoginScreen')}
                    />
                </View>
            </Spacer_Space>
        </View>

    )
}

export default PasswordChangedDone_Screen

const styles = StyleSheet.create({

    container: {
        marginTop: '16%',
        marginBottom: '10%'
    },

    title: {
        fontSize: 24,
        color: `rgb(89,88,89)`,
    },

    semiTitle: {
        fontSize: 16,
        color: `rgb(171,169,169)`,
        marginTop: 8,
    },
    background: {
        height: 200,
        aspectRatio: 1,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
    },
    ImageContainer: {
        height: '90%',
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    CenterImage: {
        height: windowWidth / 1.5,
        aspectRatio: 1,
    }

})