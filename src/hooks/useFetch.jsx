import React, { useState } from 'react'

const useFetch = (url,options) => {


    const [data, setData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(() => {
    
        peticioAsincronica()

    }, [url,options])
    
    const peticioAsincronica = async () =>{
        
        try {
            const res = await fetch(url,options)
            if(res.ok) throw new Error('No se pudo concretar la peticion', res.status)
           const resultado = await res.json()
            setData(resultado)
            } catch (error) {
            setError(error)
            }
           finally{
            setIsLoading(false)
            }
            
    }
   
    return {data,isLoading,error}
}



export default useFetch