import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteAuthorBooks } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name}${authorObj.last_name}?`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem', margin: '10px', borderRadius: '2%' }}>
        <Card.Body>
          <Card.Title>{authorObj.first_name}{authorObj.last_name}</Card.Title>
          <p className="card-subtitle mb-2 text-muted">{authorObj.email}</p>
          <p className="card-text bold">{authorObj.favorite ? '😍 Favvvvv!' : ' '}
          </p>
          <Link href={`/author/${authorObj.firebaseKey}`} passHref>
            <Button variant="success">VIEW</Button>
          </Link><br />
          <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    email: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// AuthorCard.defaultProps = {
//   email: 'you@email.com',
//   first_name: 'Brett',
//   last_name: 'Hughes',
//   favorite: true,
//   image: 'https://www.rollingstone.com/wp-content/uploads/2022/02/SnoopDogg.jpg?',
//   firebaseKey: '123',
//   email: PropTypes.string,
// };
export default AuthorCard;
