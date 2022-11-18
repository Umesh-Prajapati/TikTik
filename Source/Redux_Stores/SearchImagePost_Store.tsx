import { SEARCH_IMAGE_POST_Type } from "../Types/Redux_Types";

const initialState = [{}]

export default function SearchImagePost_Store(state: any = initialState, action: any) {

    switch (action.type) {
        case SEARCH_IMAGE_POST_Type : return action.playload;
        default: return state;
    }
}