import { useState, useCallback } from "react";

const useLoading = (init = true) => {
  const [isLoading, setIsLoading] = useState(init);

  const handleIsLoading = useCallback((val) => {
    setIsLoading(val);
  }, []);

  return [isLoading, handleIsLoading];
};

export default useLoading;
