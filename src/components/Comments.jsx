import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Button, Alert } from 'react-bootstrap';
import { deleteComment } from '../store/commentSlice';

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };

  if (comments.length === 0) {
    return <Alert variant="info">Aucun commentaire pour le moment.</Alert>;
  }

  return (
    <ListGroup>
      {comments.map((c) => (
        <ListGroup.Item key={c.id} className="d-flex flex-column align-items-start">
          <div><strong>Note: {c.note}/5</strong></div>
          <div className="mb-2">{c.comment}</div>
          <div className="align-self-end">
            <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
              Supprimer
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Comments;
