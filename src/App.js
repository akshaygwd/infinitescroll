import logo from './logo.svg';
import './App.css';
import useHookSearch from './useHookSearch';
import { useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link }  from 'react-router-dom';
import Home from './home';
import Contact from './Contact';
import ErrorPage from './ErrorPage';
import Profile from './Profile';

function App() {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const observar = useRef();
  const { loading, error, books, hasMore } =  useHookSearch(query, pageNumber);

  const useCallBBackF = useCallback((node) => {
    if (loading) return;
    if(observar.current) observar.current.disconnect();
    observar.current = new IntersectionObserver(entr => {
      if(entr[0].isIntersecting && hasMore) {
        setPageNumber(prev => prev + 1);
      }
    })
    if(node) observar.current.observe(node);
  }, [loading, hasMore]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <Router>
      <input type="text" onChange={(e) => handleChange(e)} value={query} />
      {books.map((book, index) => {
        if(books.length === index +1) {
          return <div ref={useCallBBackF} key={book}>{book}</div>
        }
        return <div key={book}>{book}</div>
      })}
      <div>{loading && 'loading..'}</div>
      <div>{error && 'Error ...'}</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" exact element={<Home />}/>
        <Route path="/contact/:id" exact element={<Profile />}/>
        <Route path="/contact" exact element={<Contact />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
