import { useState } from 'react'
import { fetcher } from '../api/fetcher'
import { TwoFactorAuth } from '../types'

export const useSubmitCountryPhone = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = (payload: TwoFactorAuth) => {
        setIsLoading(true)
        fetcher(`/challenges/two_factor_auth?phone_number=${payload.phone_number}&country_id=${payload.country_id}`, "POST")
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
        handleSubmit,
        isLoading,
        data
    }

}
