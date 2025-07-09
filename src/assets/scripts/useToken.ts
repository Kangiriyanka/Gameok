import  {useState } from "react"

function useToken() {

    const [token, setToken] = useState(getToken())

    
    function getToken() {

        const userToken = localStorage.getItem("token")
        return userToken && userToken

    }

   

    function saveToken(userToken: string) {
        localStorage.setItem('token', userToken);
        setToken(userToken)
    }

    function removeToken() {
        localStorage.removeItem("token")
        setToken(null)
    }

    return {
        token,
        setToken: saveToken,
        removeToken 
    }
}

export default useToken;

