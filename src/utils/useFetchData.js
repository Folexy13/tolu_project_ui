import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [url]);

  return { data, loading };
};
