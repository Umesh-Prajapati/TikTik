import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { FetchingData_Api } from '../../Api/FetchingData_Api'

const ReportOnPost_Comp = (props:any) => {

    const { user_id, post_id, closeBtmSheet } = props
    const [isLoading, setIsLoading] = useState(false)

    const data = [
        "It's spam",
        "Violence or dangerous organisations",
        "Scam or fraud",
        "False Information",
        "Something Else",
    ]

    async function callReportPostApi(report:any) {
        try {
            setIsLoading(true)
            var formdata = new FormData();
            formdata.append("method", "report_post");
            formdata.append("post_id", post_id);
            formdata.append("report", report);
            formdata.append("user_id", user_id);

            const res = await FetchingData_Api("POST", 'post', formdata);
            console.log(res);
            if (res.status == 1) {
                console.log(res.status);
                setIsLoading(false)
                closeBtmSheet();
                Alert.alert(
                    "Thanks For Reporting",
                    "your report is submitted.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        } catch (e:any) {
            setIsLoading(false)
            Alert.alert(e.message)
        }
    }

    if (isLoading) {
        return <View style={{alignItems:'center', marginTop:'22%'}}>
            <ActivityIndicator size={'large'} />
        </View>
    }

    return (
        <View style={styles.Container}>
            <FlatList
                ListFooterComponent={<></>}
                ListFooterComponentStyle={{padding:40}}
                data={data}
                renderItem={({ item }) => {
                    return <TouchableWithoutFeedback onPress={() => { callReportPostApi(item.toString()) }}>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 1,
                            width: 300,
                            borderBottomColor: 'grey',
                            padding: 10,
                            marginVertical: 2,
                        }}>
                            <Text>{item}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }}
            />
        </View>
    );
}

export default ReportOnPost_Comp

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
    },
    ContainItems: {
        flexDirection: 'row',
        height: 45,
        width: 335,
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
        height: '100%',
        paddingLeft: '5%',
    },
})