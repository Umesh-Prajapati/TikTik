import { combineReducers, createStore } from 'redux'

import UserProfile_Store from './UserProfile_Store'
import UserLoginState_Store from './UserLoginState_Store'
import HomePost_Store from './HomePost_Store'
import MyProfile_Store from './MyProfile_Store'
import OtherUserProfilePost_Store from './OtherUserProfilePost_Store'
import SearchImagePost_Store from './SearchImagePost_Store'
import NotificationImagePost_Store from './NotificationImagePost_Store'

const reducers = combineReducers({
    UserProfile_Store,
    UserLoginState_Store,
    HomePost_Store,
    MyProfile_Store,
    OtherUserProfilePost_Store,
    SearchImagePost_Store,
    NotificationImagePost_Store
});

const Store = createStore(reducers);

export default Store