import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Book } from "../assets/types/books";

interface Props {
  books: Book[];
}

const SearchResult: React.FC<Props> = ({ books }) => {
  const [sortByYear, setSortByYear] = useState(false);

  const toggleSortByYear = () => {
    setSortByYear(!sortByYear);
  };

  const sortedBooks = sortByYear
    ? [...books].sort((a, b) => a.first_publish_year - b.first_publish_year)
    : books;

  return (
    <div className="container">
      <button onClick={toggleSortByYear}>
        {sortByYear ? "Show original list" : "Sort by year of publication"}
      </button>
        <Grid container spacing={2}>
        {sortedBooks.map((book) => (
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <Card className="card">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {book.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Author: {book.author_name && book.author_name.join(", ")}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Publised year: {book.first_publish_year}
              </Typography>
              {book.isbn && (
                <Typography variant="body2" color="textSecondary" component="p">
                  ISBN: {book.isbn.join(", ")}
                </Typography>
              )}
              {book.number_of_pages_median && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {book.number_of_pages_median} pages
                </Typography>
              )}
            </CardContent>
          </Card>
</Grid>

        ))}
</Grid>
    </div>
  );
};

export default SearchResult;
