
import {  USERPROFILE_Type } from "../Types/Redux_Types";

const InitialState = {

}

export default function UserProfile_Store(state : any = InitialState, action : any){

    switch(action.type){
        case USERPROFILE_Type : return action.playload;
        default: return state;
    }
}