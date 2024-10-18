import useSWR from 'swr';
import { fetcher } from '../api/fetcher';
import jsonData from '../data.json'
import { Countries } from '../types';

export const useGetCountries = () => {
    const {data, isLoading, error} = useSWR<Countries>("/challenges/countries", fetcher, {
        dedupingInterval: 6 * 1000, 
        revalidateOnFocus: false
      })

    return {
        jsonData, data, isLoading, error
    }

}
