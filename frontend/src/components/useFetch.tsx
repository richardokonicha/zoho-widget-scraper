import { useEffect, useState } from 'react';

// const API_URL = 'https://project-rainfall-860841904.development.catalystserverless.com/server/functions';
const API_URL='http://localhost:3000/server/functions'

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


