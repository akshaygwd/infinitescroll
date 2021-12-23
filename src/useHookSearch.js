import { useState, useEffect } from "react";
import axios from "axios";

export default function useHookSearch(query, pageNumber) {
  const [loading , setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMmore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: 'https://openlibrary.org/search.json',
      cancelToken: new axios.CancelToken(c => cancel = c),
      params: { q: query, page: pageNumber }
    }).then((res) => {
      console.log(res.data);
      setBooks(preBooks => {
        return [...new Set([...preBooks, ...res.data.docs.map(b => b.title)])]
      })
      setHasMmore(res.data.docs.length > 0);
      setLoading(false);
    }).catch((e) => {
      if(axios.isCancel(e)) return
      setError(true);
    })
    return () => cancel();
  }, [query, pageNumber]);
  return  { loading, error, books, hasMore};
}
