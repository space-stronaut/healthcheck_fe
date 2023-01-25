import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"
import { useEffect } from "react";

export default function Internal({children}){
    const [auth, setAuth] = useRecoilState(authenticated)
    const navigate = useHistory()

    useEffect(() => {
        if (auth.auth === true) {
            if (auth.data.role === 'tsel') {
                navigate.goBack()   
            }
        }else{
            navigate.push('/login')
        }
    }, []);
    
    return children
}