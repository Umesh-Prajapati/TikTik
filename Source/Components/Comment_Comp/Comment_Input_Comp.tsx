import {
    ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TextInput,
    TouchableWithoutFeedback, View, Platform
} from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontS } from '../../Utils/FontSize';

const windowHeight = Dimensions.get('window').height;

const Comment_Input_Comp = (props:any) => {

    const {
        isLoading,
        commentEditMode,
        value,
        onSubmit,
        setMessage,
        updateComment_Cancel } = props

    const [error, setError] = useState<any>()

    if (error) {
        Alert.alert(error)
        setError(null)
    }

    return (
        <View style={styles.Container}>
            <View style={styles.centerAlign}>
                <View style={styles.ContainItems}>
                    <TouchableWithoutFeedback onPress={() => { updateComment_Cancel() }} >
                        {
                            commentEditMode
                                ?<MaterialIcons name="cancel" size={24} color="black"  style={styles.imageSticker}/>
                                : <></>
                        }
                    </TouchableWithoutFeedback>

                    <TextInput style={styles.InputText}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholder="Type comment"
                        onChangeText={setMessage}
                        value={value}
                        multiline={true}
                    />
                    <TouchableWithoutFeedback onPress={() => {
                        if (isLoading) return
                        if (value) {
                            // callCommentApi();
                            updateComment_Cancel();
                            onSubmit();
                        } else {
                            setError("Please Write Some Comment..!!")
                        }
                    }} >
                        {
                            !isLoading
                                ?<MaterialIcons name="send" size={24} color="black" style={styles.imageSticker} />
                                :
                                <ActivityIndicator size='small' style={styles.imageSticker} />
                        }
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    );
}

export default Comment_Input_Comp

const styles = StyleSheet.create({
    Container: {
        marginTop: "3%",
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:FontS(20)
    },
    ContainItems: {
        // paddingVertical: 13,
        paddingHorizontal: 11,
        flexDirection: 'row',
        width: 335,
        backgroundColor: 'rgb(251,251,251)',
        borderRadius: 10,
    },
    imageSticker: {
        width: 22,
        height: 22,
        alignSelf: 'center',
        // backgroundColor: 'grey'
    },
    centerAlign:{},
    InputText: {
        padding:FontS(15),
        flex: 1,
        height: '100%',
        paddingLeft: '5%',
        alignSelf: 'center',
        maxHeight: windowHeight / 9,
        paddingTop: "5%",
    },
})