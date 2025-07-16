import  {useState } from "react"

export default function userInfo() {

    function getUserInfo() {

        const storedUserInfo = localStorage.getItem('username')
        return storedUserInfo && storedUserInfo

    }

    const [storedUserInfo, setUserInfo] = useState(getUserInfo())
  

    function saveUserInfo(username: string) {
        localStorage.setItem('username', username);
        setUserInfo(username)
    }

    function removeUserInfo() {
        localStorage.removeItem('username')
        setUserInfo(null)
    }

    
    return {
        
        storedUserInfo,
        setUserInfo: saveUserInfo,
        removeUserInfo
    }
}



