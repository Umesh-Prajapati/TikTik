import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { FontS } from '../../Utils/FontSize';

import dayjs from 'dayjs'
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
var relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime)
const windowWidth = Dimensions.get('window').width;

const Comment_FlatList_Comp = (props: any) => {

    const { item, doDeleteComment, doUpdateComment, myComment } = props

    const leftSwipe = () => {
        return (
            <View style={cardStyle.swipeBackground}>
                <TouchableWithoutFeedback onPress={() => { doUpdateComment() }}>
                    {/* <Image source={require('../../../../assets/PostScrollingImages/edit.png')}
                        style={cardStyle.deleteImage}
                    /> */}
                    <AntDesign name="edit" size={FontS(24)} color="black" />
                </TouchableWithoutFeedback>
            </View>
        )
    }
    const rightSwipe = () => {
        return (
            <View style={cardStyle.swipeBackground}>
                <TouchableWithoutFeedback onPress={() => { doDeleteComment() }}>
                    {/* <Image source={require('../../../../assets/PostScrollingImages/delete.png')}
                        style={cardStyle.deleteImage}
                    /> */}
                    <AntDesign name="delete" size={FontS(24)} color="black" />
                </TouchableWithoutFeedback>
            </View>
        )
    }

    function addComp() {
        return (
            <View style={cardStyle.Container}>
                <View style={cardStyle.vertical}>
                    <View style={{}}>
                        {item.photo ? <Image source={{ uri: item?.photo }} style={cardStyle.photo} /> : <View style={cardStyle.photo} />}
                    </View>
                    <View style={{ flex: 1, marginLeft: 14 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={cardStyle.username}>{item.name}</Text>
                                <Text style={{
                                    color: 'rgb(149,149,149)',
                                    fontSize: 10,
                                    alignSelf: 'center'
                                }}>{dayjs(item.reg_date).fromNow()}</Text>
                            </View>
                        </View>
                        <Text style={cardStyle.comments}>{item.comment}</Text>
                        <View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    if (myComment) {
        return (
            <Swipeable
                enabled={true}
                renderRightActions={rightSwipe}
                renderLeftActions={leftSwipe}
            >
                {addComp()}
            </Swipeable>
        );
    }
    else {
        return (<>
            {addComp()}
        </>
        )
    }


}

export default Comment_FlatList_Comp

const cardStyle = StyleSheet.create({
    Container: {
        marginVertical: '2%',
        backgroundColor: 'white',
        borderRadius: 20
    },
    vertical: {
        flexDirection: 'row',
    },
    photo: {
        width: 44,
        height: 44,
        borderRadius: 100,
        backgroundColor: 'red'
    },
    username: {
        flex: 1,
        fontSize: FontS(16),
        alignSelf: 'center',
        color: 'rgb(89,88,89)',
    },
    comments: {
        fontSize: FontS(14),
        color: 'rgb(171,169,169)',
    },
    deleteImage: {
        height: windowWidth / 16,
        aspectRatio: 1,
        alignSelf: 'center'
    },
    swipeBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '13%',
        height: '100%'
    },
})