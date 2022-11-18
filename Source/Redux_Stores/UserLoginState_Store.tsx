import { USER_LOGIN_Type } from "../Types/Redux_Types";


export default function UserLoginState_Store(state : boolean = false, action : any){

    switch(action.type){
        case USER_LOGIN_Type : return action.playload;
        default: return state;
    }
}