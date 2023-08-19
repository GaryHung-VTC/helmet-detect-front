import React from "react";
import { useDebounce } from "react-use";

const useDebounceLoading = (isLoading) => {
  const [debounceLoading, setDebounceLoading] = React.useState(true);
  useDebounce(
    () => {
      setDebounceLoading(isLoading);
    },
    200,
    [isLoading]
  );
  return debounceLoading;
};

export default useDebounceLoading;
