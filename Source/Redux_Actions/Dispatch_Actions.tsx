import { HomePost_Type, MY_PROFILE_Type, NOTIFICATION_IMAGE_POST_Type, SEARCH_IMAGE_POST_Type, USERPROFILE_Type, USER_LOGIN_Type } from "../Types/Redux_Types";

export function UserProfile_Action(obj:any) { return { type : USERPROFILE_Type, playload : obj} }

export function User_Login_Action(state:boolean) { return { type : USER_LOGIN_Type, playload : state} }

export function HomePost_Action(array:any) { return { type : HomePost_Type, playload : array} }

export function MyProfile_Action(array:any) { return { type : MY_PROFILE_Type, playload : array} }

export function OtherUserProfilePost_Action(array:any) { return { type : MY_PROFILE_Type, playload : array} }

export function SearchImagePost_Action(array:any) { return { type : SEARCH_IMAGE_POST_Type, playload : array} }

export function NotificationImagePost_Action(array:any) { return { type : NOTIFICATION_IMAGE_POST_Type, playload : array} }