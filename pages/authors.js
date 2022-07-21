/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAuthors } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAllTheAuthors();
  }, [user.uid]);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/authors" passHref>
          <Button>Add An Author</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {authors.map((author) => (
            <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
          ))}
        </div>
      </div>
    </>
  );
}
