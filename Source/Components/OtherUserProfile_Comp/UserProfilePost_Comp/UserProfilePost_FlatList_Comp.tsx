import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;

const UserProfilePost_FlatList_Comp = (props:any) => {

    const { data, navigation, index } = props

    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('MyProfileSinglePostView_Screen', {
                    index:index,
                    user_id: data.user_id,
                    post_id: data.post_id,
                })
            }} >

                <View style={styles.Container}>
                    {
                        data?.attachments[data?.attachments?.length - 1]?.attachment !==''
                            ?
                            <Image source={{ uri: data?.attachments[data?.attachments?.length - 1]?.attachment || null }} style={styles.image} />
                            : null
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfilePost_FlatList_Comp

const styles = StyleSheet.create({
    Container: {
        // marginVertical:'0.90%',
        // marginHorizontal:'0.30%'
        margin: windowWidth / 99 * .2
    },
    image: {
        width: windowWidth / 3.04,
        aspectRatio: 1,
    }
})