import { Button, Container, TextField, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { styled } from '@mui/system'
import theme from '../theme'
import { FormEvent, useState } from 'react'

// const CustomButton = styled('button')({
//   backgroundColor: theme.custom.orange,
//   transition: 'all ease-in-out 0.2s',
//   cursor: 'pointer',

//   '&:hover': {
//     backgroundColor: theme.custom.darkOrange
//   }
// })

export default function Create() {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title === '') setTitleError(true)
    if (details === '') setDetailsError(true)

    if (title && details) {
      console.log(title, details)
    }
  }

  return (
    <Container>
      <Typography
        color="textSecondary"
        variant="h6"
        component="h2"
        gutterBottom
      >
        Create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={e => setTitle(e.target.value)}
          value={title}
          label="Note Title"
          fullWidth
          required
          sx={{ my: 2, display: 'block' }}
          error={titleError}
          helperText={titleError ? 'Campo obrigatório' : ''}
        />

        <TextField
          onChange={e => setDetails(e.target.value)}
          value={details}
          label="Details"
          fullWidth
          required
          multiline
          rows={4}
          sx={{ my: 2, display: 'block' }}
          error={detailsError}
          helperText={detailsError ? 'Campo obrigatório' : ''}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      {/* <CustomButton>Meu Botão</CustomButton> */}
    </Container>
  )
}
