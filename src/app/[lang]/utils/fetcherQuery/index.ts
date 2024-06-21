// useQuery.ts

import { useState, useEffect, useCallback } from 'react';

type QueryResult<T> = {
    responseData: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
};

type Fetcher<T> = () => Promise<T>;

export const useQuery = <T>(key: string, fetcher: Fetcher<T>): QueryResult<T> => {
  const [responseData, setData] = useState<T | null>(() => cache.get(key) || null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!cache.has(key));

  const fetchAndCacheData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetcher();
      cache.set(key, result);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher]);

  useEffect(() => {
    if (!cache.has(key)) {
      fetchAndCacheData();
    }
  }, [key, fetchAndCacheData]);

  return { responseData, error, isLoading, refetch: fetchAndCacheData };
};

// Cache yapısı
const cache = new Map<string, any>();
