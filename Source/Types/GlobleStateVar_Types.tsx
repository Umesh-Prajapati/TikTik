import { useDispatch, useSelector } from "react-redux";


const dispatch = useDispatch();
const isLogin = useSelector((state: any) => state.UserLoginState_Store);
const resp = useSelector((state: any) => state.UserProfile_Store);
const loginUser_id = useSelector((state: any) => state.UserProfile_Store.data.user_id);
const ProfileType_LoginUser = useSelector((state: any) => state.UserProfile_Store.data.settings?.profile);


