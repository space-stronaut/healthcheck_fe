import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"
import { useEffect } from "react";

export default function Auth({children}){
    const [auth, setAuth] = useRecoilState(authenticated)
    const navigate = useHistory()

    useEffect(() => {
        if (auth.auth == false) {
            navigate.push('/login')
        }
    }, []);
    
    return children
}