import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"
import { useEffect } from "react";

export default function Guest({children}){
    const [auth, setAuth] = useRecoilState(authenticated)
    const navigate = useHistory()

    useEffect(() => {
        if (auth.auth === true) {
            navigate.goBack()
        }
    }, []);
    
    return children
}