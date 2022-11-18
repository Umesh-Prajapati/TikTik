import { Dimensions, StyleSheet } from 'react-native'
import { FontS } from '../Utils/FontSize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Search_Styles = StyleSheet.create({

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Search-Screen/FollowFollowing_Comp/InnerComp

    MainContainer: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(243,243,243)',
    },
    VerticalView: {
        flex: 1,
    },
    InnerVerticalContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    profileImg: {
        width: windowWidth / 8,
        aspectRatio: 1,
        backgroundColor: 'black',
        borderRadius: 100,
        marginRight: '2%'
    },
    userNameView: {},
    ButtonContainer: {
        backgroundColor: 'rgb(22,149,240)',
        height: '65%',
        width: '25%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnName: {
        color: 'white',
        fontSize: FontS(13),
    },

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    // Search-Screen/Image_Screen
    Image_MainContainer: {
        // flex:1,
        margin: '2%',
        // shadowColor: '#171717',
        // shadowOffset: { width: -2, height: 4 },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
    },
    autoHeight: {
        borderRadius: windowWidth / 25,
        width: '100%',
    },
    layoutContainer: {
        height: "100%",
        position: 'absolute',
        justifyContent: 'flex-end'
    },
    innerContainer: {
        flexDirection: 'row',
        margin: '10%',
    },
    images: {
        width: '30%',
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: 'black'
    },
    fontStyle1: {
        fontSize: FontS(12),
        color: 'white'
    },
    textContainer: {
        justifyContent: 'center',
        marginLeft: '5%'
    },
    fontStyle2: {
        fontSize: FontS(7),
        color: 'white'
    }
})