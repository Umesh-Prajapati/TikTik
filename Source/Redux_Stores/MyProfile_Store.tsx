import { MY_PROFILE_Type } from "../Types/Redux_Types";

const initialState = [{}]

export default function MyProfile_Store(state: any = initialState, action: any) {

    switch (action.type) {
        case MY_PROFILE_Type : return action.playload;
        default: return state;
    }
}