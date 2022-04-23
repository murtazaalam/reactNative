import {AsyncStorage} from 'react-native';
import routes from "./apiRoutes";
import axios from 'axios';

export const registerApi = async(body) =>{
    try{
        return await axios.post(routes.SendOTP, body, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            console.log(">>>>",error)
            return error
        })
    }
    catch(err){
        console.log(">>>>",err)
    }
}

export const verifyOTPApi = async(body) =>{
    try{
        return await axios.post(routes.VerifyOTP, body, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            return error
        })
    }
    catch(err){
        console.log(">>>>",err)
    }
}
export const editUserApi = async(body) =>{
    const token = await AsyncStorage.getItem("token")
    try{
        return await axios.put(routes.Edituser, body, {
            headers: {
                "Content-Type": "application/json",
                "token":token
            }
        }).then((res) => {
            return res.data
        }).catch((error) => {
            console.log(">>>>",error)
            return error
        })
    }
    catch(err){
        console.log(">>>>",err)
    }
}
