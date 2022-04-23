import { verifyOTPApi } from "../../services/api"; 
export const getUser = (payload) => {
    return async (dispatch) => {
        console.log("working");
        try {
            dispatch({
                type: "LOGIN_USER_LOADING"
            });
            const response = await verifyOTPApi(payload);
            if(response){
                dispatch({
                    type: "LOGIN_USER_SUCCESS"
                });
                dispatch({
                    type: "AUTH_USER_SUCCESS",
                    token: response
                });
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                });
                return response;
            }else{
                throw response
            }
        } catch (error) {
            return error;
        }
    }
}