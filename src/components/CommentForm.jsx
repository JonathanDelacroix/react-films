import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addComment } from '../store/commentSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button, Container } from 'react-bootstrap'

const schema = yup.object().shape({
  comment: yup.string().required('Le commentaire est obligatoire').max(500, 'Max 500 caractères'),
  note: yup.string().required('').oneOf(['1', '2', '3', '4', '5'], 'Veuillez sélectionner une note'),
  acceptConditions: yup.bool().required('').oneOf([true], 'Vous devez accepter les conditions générales')
})

const CommentForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: "",
      note: '',
      acceptConditions: false,
    }
  })

  const onSubmit = data => {
    const commentData = {
      id: new Date().toISOString(),
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
          <Form.Control 
            as="textarea"
            rows={4}
            maxLength={500}
            {...register('comment')}
            isInvalid={!!errors.comment}
          />
          <Form.Control.Feedback type="invalid">
            {errors.comment?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Select {...register("note")} type="select" name="note" isInvalid={!!errors.note}>
              <option value="" disabled hidden>Sélectionnez une note</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.note?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="acceptConditions">
          <Form.Check
            name="acceptConditions"
            type="checkbox"
            label="J'accepte les conditions"
            {...register('acceptConditions')}
            isInvalid={!!errors.acceptConditions}
            feedback={errors.acceptConditions?.message}
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit" variant="primary">Ajouter</Button>
      </Form>
    </Container>
  )
}

export default CommentForm
