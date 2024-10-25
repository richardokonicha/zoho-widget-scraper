import { useEffect, useState } from 'react';

let API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  console.error('REACT_APP_API_URL environment variable not set');
  throw new Error('REACT_APP_API_URL environment variable not set');
} else {
  API_URL = API_URL + '/server/functions';
  console.log('API_URL:', API_URL);
}
console.log("API URL:", API_URL);

export type DataProps = {
  name: string;
  price: string;
  score: string;
  reviews: string;
}

const useFetch = () => {
  const [data, setData] = useState<DataProps[] | null>(null);
  const [search, setSearchValue] = useState<string>('');
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchData = async (url: string, bodyData: object) => {
    setFetching(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
  
      const result = await response.json();
      if (result && Array.isArray(result)) {
        setData(result);
      } else {
        console.error('Unexpected response structure:', result);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setFetching(false);
    }
  };
  

  const inputFilter = () => {
    if (data === null) return null;
    return data.filter((item: DataProps) => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const refetch = () => {
    fetchData(`${API_URL}/scrape`, { key: 'value', anotherKey: 'anotherValue' });
  };


  useEffect(() => {
    fetch(`${API_URL}/latest`)
      .then((res) => res.json())
      .then((response) => {
        if (response && Array.isArray(response)) {
          setData(response);
        } else {
          console.error('Unexpected response structure:', response);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return {
    data: inputFilter(), 
    setSearchValue,
    refetch, 
    fetching
  };
};

export default useFetch;


