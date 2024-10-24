import { useState } from 'react'
import { fetcher } from '../api/fetcher';

const CORPORATE_ID = 10
const apiKey = import.meta.env.VITE_API_KEY;

const useGetAccessToken = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePost = () => {
        setIsLoading(true)
        fetcher(`/access_token?corporate_id=${CORPORATE_ID}`, "POST", {'Api-Key' : apiKey})
        .then((res) => {
            console.log(res.access_token)
            // Ideally we would set this as a cookie with the flags httponly, samesite, and secure. 
            localStorage.setItem("token", res.access_token)
            setIsLoading(false)
            alert(`Access token retrieved`)
        })
        .catch(err => {
            alert(`Something went wrong ${JSON.stringify(err)}`)
            setIsLoading(false)
        })
    }

    return {
        handlePost,
        isLoading,
    }

  return {}
}

export default useGetAccessToken