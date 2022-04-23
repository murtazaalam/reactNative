const endpoint = "http://ec2-18-206-58-123.compute-1.amazonaws.com:3333/";

const routes = {
    SendOTP: endpoint + "user/send-otp",
    VerifyOTP: endpoint + "user/verify-otp",
    Edituser: endpoint + "user"
}
export default routes;