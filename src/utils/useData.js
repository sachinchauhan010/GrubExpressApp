import { useState, useEffect } from "react";
import { API_URL } from "./Constant";
const useData = () => {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const tempData = await fetch(API_URL);
    const jsonData = await tempData.json();
    setApiData(jsonData?.data);
    console.log("Hello");
  };
  
  return apiData;
};
export default useData;
