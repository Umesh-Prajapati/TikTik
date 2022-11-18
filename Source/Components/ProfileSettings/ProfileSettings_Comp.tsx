import { ActivityIndicator, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontS } from '../../Utils/FontSize' 


const ProfileSettings_Comp = (props:any) => {

    const { name, isLoader, toggleSwitch, isEnabled } = props

    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <View style={styles.SemiContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textName}>{name}</Text>
                </View>
                {
                    isLoader
                        ? <View style={{ height: '100%', marginHorizontal: '4%', justifyContent:'center' }}><ActivityIndicator size={'small'} /></View>
                        :
                        <Switch
                            trackColor={{ false: "#767577", true: "rgb(22,149,240)" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                }
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 0.6, marginVertical: '3%' }} />

        </View>
    )
}

export default ProfileSettings_Comp
const styles = StyleSheet.create({
    SemiContainer: {
        flexDirection: 'row',
        height:30
    },
    textContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    textName: {
        fontSize: FontS(20),
    },
})