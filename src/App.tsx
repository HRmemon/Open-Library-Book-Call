import React, { useState, useEffect } from "react";
import "./App.css";
import { Book } from "./assets/types/books";
import DelaySlider from "./components/DelaySlider";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResults";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");
  const [delay, setDelay] = useState<number>(1000);
  const [callCount, setCallCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
    setIsLoading(true);
        fetch(`https://openlibrary.org/search.json?q=${query}`)
          .then((response) => response.json())
          .then((data) => {
            setBooks(data.docs);
            setCallCount((prevCount) => prevCount + 1);
            setIsLoading(false);
          })
          .catch((error) => {
            setError("Error fetching data.");
            setIsLoading(false);
          });
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [query, delay]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setError("");
  };

  const handleDelayChange = (newDelay: number) => {
    setDelay(newDelay);
  };

  return (
    <div className="App">
      <div className="container">
        <SearchBox onQueryChange={handleQueryChange} />
        <DelaySlider value={delay} onChange={handleDelayChange} />
        <div>API Call Count: {callCount}</div>
      </div>
      <div className="contianer">
        {isLoading && <div>Fetching...</div>}
        {error && <div>{error}</div>}
        <SearchResult books={books} />
      </div>
    </div>
  );
};

export default App;
