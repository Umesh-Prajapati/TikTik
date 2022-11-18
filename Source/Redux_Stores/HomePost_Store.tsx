import { HomePost_Type } from "../Types/Redux_Types";

const initialState = [{}]

export default function UserLoginState_Store(state: any = initialState, action: any) {

    switch (action.type) {
        case HomePost_Type : return action.playload;
        default: return state;
    }
}