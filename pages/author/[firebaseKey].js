import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Body>
          <Card.Title>{authorDetails.first_name} {authorDetails.last_name}</Card.Title>
          Author Email: <a href={`mailto:${authorDetails.authorObject?.email}`}>{authorDetails.authorObject?.email}</a>
          <p className="card-text bold">{authorDetails.favorite ? '😍 Favvvvv!' : ' '}</p>
        </Card.Body>
      </Card>
      {authorDetails.books?.map((book) => (
        <BookCard key={book.firebaseKey} bookObj={book} />
      ))}
    </div>
  );
}
export default ViewAuthor;
