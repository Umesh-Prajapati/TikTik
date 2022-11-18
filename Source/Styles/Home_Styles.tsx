import { Dimensions, StyleSheet } from 'react-native'
import { FontS } from '../Utils/FontSize';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Home_Styles = StyleSheet.create({
    container: {},
    Main_Container: {
        height: "100%",
        backgroundColor: 'white'
    },
    flComp_Container: {
        flex: 1,
        width: windowWidth,
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
        backgroundColor: "#fff"
    },
    background: {
        width: windowWidth,
        height: '100%',
        backgroundColor: 'white', // background color
        zIndex: 1
    },
    linearBg: {
        width: '100%',
        height: "100%",
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    secondInnerContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: windowWidth / 50,
    },
    descriptionView: {
        // flex:1,
        maxHeight: windowHeight * .3,
        flexGrow: 0,
        paddingBottom: 15,
        // height: windowHeight / 6,
    },
    verticalContainer: {
        height: windowHeight / 2,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    },
    userName: {
        fontSize: FontS(18),
        color: "#fff",
        marginTop: 8,
    },
    postTitle: {
        fontSize: FontS(18),
        color: "#fff",
        marginTop: 8,
    },
    postDescription: {
        fontSize: FontS(18),
        color: "#fff",
        marginTop: 8,
    },
    horizontalContainer: {
        marginLeft: 5,
        height: windowHeight / 3,
        // width:'100%',
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileImage: {
        width: windowHeight / 14,
        height: windowHeight / 14,
        borderRadius: 100,
        backgroundColor: 'black'
    },
    imagesContainer: {
        alignItems: 'center'
    },
    elementImage: {
        height: windowHeight / 25,
        width: windowHeight / 22,
        marginBottom: 5,
    },

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    //inner Comp in Last
    btnContainer: {
        marginTop: '3%',
        alignSelf: 'center'
    },
    btn: {
        height: 45,
        width: 240,
        backgroundColor: `rgb(22,149,240)`,
        borderRadius: 10,
        justifyContent: 'center',
        shadowColor: `rgba(89,88,89,0.83)`,
        shadowOffset: { width: 0, height: 1, blur: 4 },
        // shadowOpacity: 0.4,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },


})