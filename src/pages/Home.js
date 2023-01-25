import { useRecoilState } from "recoil"
import { authenticated } from "../store/authStore"
import styled from "styled-components";

export default function Home(){

    const Center = styled.div`
    flex: 1;
    text-align: center;
    `;

    const Logo = styled.h1`
    font-weight: bold;
    `;

    const [auth, setAuth] = useRecoilState(authenticated)
    return (
        <div>
            <span>
                {
                    auth.auth
                }
            </span>
            <Center>
                Welcome To Dashboard!!!
            </Center>
        </div>
    )
}