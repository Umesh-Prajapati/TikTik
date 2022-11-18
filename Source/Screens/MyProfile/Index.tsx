import { StyleSheet } from 'react-native'
import React from 'react'
import SimpleHeader_Comp from '../../Components/GlobalComp/SimpleHeader_Comp'
import OtherUserProfile_Screen from '../OtherUserProfile_Screen/OtherUserProfile_Screen'

const Index = ({ navigation, route }: any) => {

    return (<>
        <SimpleHeader_Comp
            headerName="Profile"
            myProfile={true}
        />
        <OtherUserProfile_Screen route={route} navigation={navigation} />
    </>
    )
}

export default Index

const HEADER_HEIGHT = 250

const styles = StyleSheet.create({
    box: {
        height: 250,
        width: '100%',
    },
    boxA: {
        backgroundColor: 'white',
    },
    boxB: {
        backgroundColor: '#D8D8D8',
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: '#2196f3',
    },
})