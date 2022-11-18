import { NOTIFICATION_IMAGE_POST_Type } from "../Types/Redux_Types";

const initialState = [{}]

export default function NotificationImagePost_Store(state: any = initialState, action: any) {

    switch (action.type) {
        case NOTIFICATION_IMAGE_POST_Type : return action.playload;
        default: return state;
    }
}