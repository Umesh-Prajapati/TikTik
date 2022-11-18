import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyProfile_Action, SearchImagePost_Action } from '../../Redux_Actions/Dispatch_Actions';
import Single_Post_Detail_Comp from '../../Components/SinglePostView_Comp/Single_Post_Detail_Comp';

const SearchSinglePostView_Screen = ({ route, navigation }: any) => {

    const { index } = route.params

    const dispatch = useDispatch();
    const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id);
    const GlobalData = useSelector((state: any) => state.SearchImagePost_Store);
    const whichTypeScreen = 'SearchSinglePostView'

    const [data, setData] = useState(GlobalData);

    useEffect(() => {
        navigation.addListener("focus", () => {
            setData(GlobalData);
        });
    }, [GlobalData])

    function postLike() {
        let clone = GlobalData
        if (clone[index].is_liked == 0) {
            clone[index].is_liked = 1;
            clone[index].likes = parseInt(clone[index]?.likes) + 1;
        } else {
            clone[index].is_liked = 0;
            clone[index].likes = parseInt(clone[index]?.likes) - 1;
        }

        dispatch(SearchImagePost_Action([...clone]));
    }

    function postDelete() {
        let temp = GlobalData
        let cut = temp.splice(index, 1);
        dispatch(SearchImagePost_Action([...cut]));
    }

    return (
        <View style={styles.MainContainer}>
            <Single_Post_Detail_Comp
                index={index}
                data={data[index] || []}
                whichTypeScreen={whichTypeScreen}
                navigation={navigation}
                loginUser_id={loginUser_id}
                postLike={() => postLike()}
                postDelete={() => postDelete()}
            />
        </View>
    )
}

export default SearchSinglePostView_Screen

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    postImage: {
        width: '100%',
        aspectRatio: 1,
        position: 'absolute',
    },
    SecondContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
    },

})