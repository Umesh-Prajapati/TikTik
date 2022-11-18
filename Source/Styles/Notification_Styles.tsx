import { Dimensions, StyleSheet } from 'react-native'
import { FontS } from '../Utils/FontSize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Notification_Styles = StyleSheet.create({

    //=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // notification Components
    MainContainer: {
        flex: 1,
    },
    Container: {
        height: windowHeight / 11,
        width: windowWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        width: '15%',
        aspectRatio: 1,
        backgroundColor: 'black',
        marginRight: '5%',
        borderRadius: 100,
        alignItems:'center',
        justifyContent:'center'
    },
    profileImage: {
        // width:'100%',
        aspectRatio: 1,
        borderRadius: 100
    },
    textContainer: {
        height: '70%',
        justifyContent: 'space-evenly',
    },
    text1: {
        fontSize: FontS(15),
        fontWeight: '500'
    },
    text2: {
        fontSize: FontS(15),
    },
    text3: {
        fontSize: FontS(15),
        color: 'rgb(206,168,168)',
    }

})