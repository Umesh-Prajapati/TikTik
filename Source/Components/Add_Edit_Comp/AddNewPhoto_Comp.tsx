import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontS } from '../../Utils/FontSize';

import * as ImagePicker from 'expo-image-picker';

const AddNewPhoto_Comp = ({ onSubmit, myProfile, photoUrl }: any) => {

    const [image_uri, setUri] = useState(photoUrl || '')

    async function callLibrary() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.5,
            allowsEditing: true,
        });
        if (!result.cancelled) {
            setUri(result?.uri);
            onSubmit(result?.uri);
            // console.log(result);
            //6103836 -=-=1
            //309786 -=-=0
        }
    }

    if (myProfile) {
        return (
            <View style={styles.post_image}>
                <TouchableOpacity style={styles.myProfilePost} onPress={() => callLibrary()} >
                    {
                        image_uri ? <Image source={{ uri: image_uri }}
                            resizeMode='cover' style={styles.profileImage}
                        />
                            : <Text style={{ fontSize: FontS(18) }}>Profile Image</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.post_image}>
            <TouchableOpacity style={styles.addPost} onPress={() => callLibrary()} >
                {
                    image_uri ?
                        <Image resizeMode='cover'
                            source={{ uri: image_uri }} style={styles.image} />
                        : <Text style={{ fontSize: FontS(20) }}>Add New Post</Text>
                }
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    post_image: {
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        // height: '100%',
        aspectRatio: 1,
        borderRadius: 30,
    },
    addPost: {
        borderRadius: 30,
        width: '70%',
        aspectRatio: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: '100%',
        // height: '100%',
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: 'red'
    },
    myProfilePost: {
        borderRadius: 100,
        width: '40%',
        aspectRatio: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default AddNewPhoto_Comp