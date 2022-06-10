import { useState, useEffect } from "react"

export const useFetch = (url: String, method: string = 'GET') => {
  const [data, setData] = useState<any>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [options, setOptions] = useState<object | null>(null)

  const postData = (postData: object | string) => {
    
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions?: object) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url as RequestInfo, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err: any) {
        if (err?.name === "AbortError") {
          // console.log("the fetch was aborted") // only for dev purposes
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    if (method === 'GET') 
      fetchData()
    else if (method === 'POST' && options)
      fetchData(options)

    return () => {
      controller.abort()
    }

  }, [url, options, method])

  return { data, isPending, error, postData }
}