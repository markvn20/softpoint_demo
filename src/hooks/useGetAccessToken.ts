import { useState } from 'react'
import { fetcher } from '../api/fetcher';

const CORPORATE_ID = 10
const apiKey = import.meta.env.VITE_API_KEY;

const useGetAccessToken = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handlePost = () => {
        setIsLoading(true)
        fetcher(`/access_token?corporate_id=${CORPORATE_ID}`, "POST", {'Api-Key' : apiKey})
        .then((res) => {
            setData(res)
            setIsLoading(false)
            alert(`Form submitted ${JSON.stringify(res)}`)
        })
        .catch(err => {
            alert(`Something went wrong ${JSON.stringify(err)}`)
            setIsLoading(false)
        })
    }

    return {
        handlePost,
        isLoading,
        data
    }

  return {}
}

export default useGetAccessToken