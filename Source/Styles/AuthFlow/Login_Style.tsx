import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

export const Login_Style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%'
    },
    background: {
        width: '63.5%',
        height: 199,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
    },
    logoContainer: {
        width: windowWidth,
        alignItems: 'center',
    },
    logo: {
        width: 76,
        height: 85,
    },
    inputContainer: {
        margin: 20,
    },
    forgot: {
        marginTop: 21,
        marginBottom: 27,
        // textAlign: 'right',
        color: `rgb(171,169,169)`,
    },
    button: {
        alignSelf: 'center',
    },
    signInContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    signIn: {
        fontSize: 14,
        fontWeight: '700',
        color: `rgb(22,149,240)`,
    },
    error_msg: {
        color: 'red',
        margin: 10,
    }

})