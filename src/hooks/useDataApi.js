// inspiration https://www.robinwieruch.de/react-hooks-fetch-data
import { useState, useEffect, useCallback } from "react";

const useDataApi = ({ dataFetcher, initialData }) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    if (dataFetcher) {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await dataFetcher();
        setData(result);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
  }, [dataFetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData, dataFetcher]);

  return [{ data, isLoading, isError }, fetchData];
};

export default useDataApi;
