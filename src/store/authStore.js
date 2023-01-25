import {atom} from 'recoil'

export const authenticated = atom({
    key : 'authenticated',
    default : {
        auth : false,
        data : null
    }
})