import { OTHER_USER_PROFILE_POST_Type } from "../Types/Redux_Types";

const initialState = [{}]

export default function OtherUserProfilePost_Store(state: any = initialState, action: any) {

    switch (action.type) {
        case OTHER_USER_PROFILE_POST_Type : return action.playload;
        default: return state;
    }
}