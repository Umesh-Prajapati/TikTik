import { Dimensions, StyleSheet } from 'react-native'
import { FontS } from '../Utils/FontSize';

const windowWidth = Dimensions.get('window').width;

const HorizontalSpacer = "3%";
const VerticalSpacer = "1%";

export const OtherProfile_Styles = StyleSheet.create({

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=
    // header Comp Styles...
    Container: {
        flex: 1,
        margin: '2%'
    },
    profileDetailContainer: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    profileImage: {
        borderRadius: 100,
        width: '25%',
        aspectRatio: 1,
        backgroundColor: 'grey',
        marginBottom: "2%"
    },
    txtContainer: {
        alignItems: 'center',
    },
    buttonsContainer: {
        // flex: 1,
        // marginVertical: "6%",
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    secondTxtContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    txtCenter: {
        alignItems: 'center'
    },
    totalTxt: {
        fontSize: FontS(16),
        fontWeight: '700'
    },
    titleTxt: {
        fontSize: FontS(15),
    },
    online: {
        width: '2%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginLeft: '1%',
        borderRadius: 100,
    },

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=
    // Image Listing Comp Styles...
    MainContainer: {
        flex: 1,
        // marginVertical: VerticalSpacer,
        backgroundColor: "white",
        width: windowWidth,
    },
    ProfileNameContainer: {
        flexDirection: "row",
    },
    ImageComp_profileImage: {
        width: "10%",
        aspectRatio: 1,
        backgroundColor: "red",
        borderRadius: 100,
        marginHorizontal: HorizontalSpacer,
    },
    LikeCommentContainer: {
        flexDirection: "row",
        marginHorizontal: HorizontalSpacer,
    },
    elementImage: {
        height: windowWidth / 20,
        marginHorizontal: HorizontalSpacer,
        width: windowWidth / 18,
        // aspectRatio: 1,
        // marginBottom: 5,
    },
    NameTextContainer: {
        flex: 1,
        alignSelf: "center",
    },
    Menu: {
        marginHorizontal: HorizontalSpacer,
        alignSelf: "center",
        alignItems: "flex-end",
    },
    ImageContainer: {
        marginVertical: VerticalSpacer,
    },
    ContentImage: {
        width: "100%",
        aspectRatio: 1,
        backgroundColor: "green",
    },
    DescriptionContainer: {
        marginHorizontal: HorizontalSpacer,
        marginVertical: VerticalSpacer,
    },
    PostTimer: {
        fontSize: FontS(10),
        marginVertical: VerticalSpacer,
        color: "grey",
    },
    CommentTotal: {
        fontSize: FontS(12),
        marginVertical: VerticalSpacer,
        color: "grey",
    },
})