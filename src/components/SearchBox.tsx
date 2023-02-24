import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onQueryChange }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQueryChange(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, onQueryChange]);

  return (
    <div>
      <TextField
        label="Search for books"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
