import { ActivityIndicator, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontS } from '../../Utils/FontSize';
import { Octicons } from '@expo/vector-icons';

const Search_Input_Comp = (props: any) => {

    const { onChange, isLoading, onSubmit } = props

    return (
        <View style={styles.Container}>
            <View style={styles.ContainItems}>
                <Octicons name="search" size={FontS(22)} style={styles.imageSticker} color="grey" />
                <TextInput style={styles.InputText}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder="Search User"
                    onChangeText={onChange}
                    onEndEditing={onSubmit}
                />
                {isLoading
                    ? <ActivityIndicator size='small' style={styles.imageSticker} />
                    : null
                }
            </View>
        </View>
    );
}

export default Search_Input_Comp


const styles = StyleSheet.create({
    Container: {
        // marginTop: "3%",\
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContainItems: {
        flexDirection: 'row',
        height: 45,
        backgroundColor: 'rgb(251,251,251)',
        borderRadius: 10,
    },
    imageSticker: {
        width: 22,
        height: 22,
        marginVertical: 13,
        marginHorizontal: 11,
        alignSelf: 'center',
    },
    InputText: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});