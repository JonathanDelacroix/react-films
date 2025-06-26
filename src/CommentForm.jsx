import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addComment } from './store/commentSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button, Container } from 'react-bootstrap'

const schema = yup.object().shape({
  comment: yup.string().required('Le commentaire est obligatoire').max(500, 'Max 500 caractères'),
  note: yup.string().required('').oneOf(['1', '2', '3', '4', '5'], 'Veuillez sélectionner une note'),
  acceptConditions: yup.bool().oneOf([true], 'Vous devez accepter les conditions générales')
})

const CommentForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      note: '',
      accepted: false,
    }
  })

  const onSubmit = data => {
    const commentData = {
      id: new Date(),
      comment: data.comment,
      note: data.note
    }
    dispatch(addComment(commentData))
    reset()
  }

  return (
    <Container>
        <h4>Commentaires</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Ajouter un commentaire</Form.Label>
          <Form.Control as="textarea" {...register('comment')} />
          <small className="text-danger">{errors.comment?.message}</small>
        </Form.Group>
        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Select {...register("note")} type="select" name="note">
              <option value="" disabled hidden>Sélectionnez une note</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </Form.Select>
          <small className="text-danger">{errors.note?.message}</small>
        </Form.Group>
        <Form.Group className="mb-3" controlId="accepted">
          <Form.Check
            name="accepted"
            type="checkbox"
            label="J'accepte les conditions"
            {...register('acceptConditions')}
          />
          <small className="text-danger">{errors.acceptConditions?.message}</small>
        </Form.Group>
        <Button type="submit">Ajouter</Button>
      </Form>
    </Container>
  )
}

export default CommentForm
