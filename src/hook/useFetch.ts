// useFetch.ts
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface UseFetchOptions extends AxiosRequestConfig {}

interface UseFetchResult<T> {
  response: T | null;
  error: Error | null;
  loading: boolean;
  request: (method: string, data?: any) => Promise<void>;
}

const useFetch = <T>(
  url: string,
  options?: UseFetchOptions
): UseFetchResult<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const request = async (method: string, data?: any) => {
    try {
      const requestOptions: UseFetchOptions = {
        method: method,
        url: url,
        ...(data && { data: data }), // Add data property for POST, PUT
        ...options,
      };

      const response = await axios(requestOptions);
      setResponse(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    request('get');
  }, []);

  return { response, error, loading, request };
};

export default useFetch;
