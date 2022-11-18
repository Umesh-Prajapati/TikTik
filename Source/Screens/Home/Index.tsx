import { ActivityIndicator, FlatList, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Home_Styles } from '../../Styles'
import { FetchingData_Api } from '../../Api/FetchingData_Api'
import { HomePost_Action } from '../../Redux_Actions/Dispatch_Actions'
import HomePost_Comp from '../../Components/Home_Screen/HomePost_Comp'

import ScreenLoading from '../ScreenLoader/index'

const Index = ({ navigation }: any) => {

  const dispatch = useDispatch();
  const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id)
  const globalData = useSelector((state: any) => state.HomePost_Store)
  const [homePostData, setHomePostData] = useState<any>([]);

  useLayoutEffect(()=>{
    callPost(true, false);
  },[])

  useEffect(() => {
    reRenderData()
  }, [globalData]);

  // useEffect(() => {
  //   navigation.addListener('focus', () => callPost(true, true))
  // }, [navigation]);

  function reRenderData() {
    let data = [...globalData]
    setHomePostData([...data])
  }

  const [screenLoading, setScreenLoading] = useState(true);

  const [topLoader, setTopLoader] = useState(true);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [resume, setResume] = useState(true);
  const [pageNext, setPageNext] = useState(true);
  const [page, setPage] = useState(0);

  async function callPost(isReset = false, Resume = false) {
    setResume(false)
    let isNextPage: any = isReset ? 0 : page;
    var formdata = new FormData();
    formdata.append("method", "get_post_list");
    formdata.append("user_id", loginUser_id);
    formdata.append("limit", '5');
    formdata.append("page", Resume ? isNextPage : isNextPage + 1);
    const resp = await FetchingData_Api("POST", 'post', formdata);
    try {
      if (resp?.data && resp?.data?.length > 0) {
        Resume ? console.log("Recalliing-=-=-=--=-=-=-=-=-=-=-=") : null
        
        Resume ? setHomePostData(resp?.data) : setHomePostData(isReset ? [...resp.data] : [...globalData, ...resp.data])
        Resume ? dispatch(HomePost_Action([...resp.data]))
          : dispatch(HomePost_Action(isReset ? [...resp.data] : [...globalData, ...resp.data]))
        //--------------------------------------

        !Resume && setPage(isNextPage + 1)
        pageNext == false && setPageNext(true)
        setResume(true)
        bottomLoader == true && setBottomLoader(false)
        setTopLoader(false)
        screenLoading && setScreenLoading(false)
        return;
        //--------------------------------------
      }
    } catch (e:any) {
      screenLoading && setScreenLoading(false)
      console.log("Home Screen Starting Error===>", e.message)
    }
    setResume(true)
    setBottomLoader(false)
    setPageNext(false)
    screenLoading && setScreenLoading(false)
  }

  function doDeletePost(index: any) {
    console.log(homePostData.length);
    const clone = [...homePostData]
    clone.splice(index, 1)
    console.log(homePostData.length);
    try {
      dispatch(HomePost_Action([...clone]))
    } catch (e: any) {
      console.log(e.message);
    }
  }

  function bottomRefresh() {
    if (homePostData.length > 4) {
      if (pageNext) {
        if (resume) {
          console.log("call ::: Bottom", pageNext);
          setBottomLoader(true)
          callPost(false, false)
        }
      }
    }
  }

  function topRefresh() {
    console.log("call ::: Top", resume);
    if (resume) {
      setTopLoader(true)
      callPost(true, false)
      setTopLoader(false)
    }
  }

  function LoadingLayout() {
    return (
      <View>
        {
          bottomLoader ?
            <ActivityIndicator size='large' />
            : null
        }
      </View>
    );
  }

  if(screenLoading){
    return <ScreenLoading />
  }

  return (
    <View style={Home_Styles.Main_Container}>
      <FlatList
        ListEmptyComponent={()=><></>}
        nestedScrollEnabled={true}
        onRefresh={() => topRefresh()}
        refreshing={topLoader}
        ListFooterComponent={<LoadingLayout />}
        onEndReached={() => bottomRefresh()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "25%" }}
        keyExtractor={(item, index: any) => index}
        data={homePostData}
        extraData={homePostData}
        renderItem={({ item, index }) => {
          return <HomePost_Comp
            key={index}
            data={item}
            index={index}
            loginUser_id={loginUser_id}
            doDeletePost={() => doDeletePost(index)}
            navigation={navigation}
          />
        }}
      />
    </View>
  )
}

export default Index