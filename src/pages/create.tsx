import { GetStaticProps } from 'next'
import Container from '@mui/material/Container'
// import FormControl from '@mui/material/FormControl'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import FormLabel from '@mui/material/FormLabel'
// import Radio from '@mui/material/Radio'
// import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { FormEvent, useState } from 'react'
import { api } from '../helpers/axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

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
  //const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  //const [category, setCategory] = useState('money')
  const [isSending, setIsSending] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //setTitleError(false)
    setDetailsError(false)

    //if (title === '') setTitleError(true)
    if (details === '') setDetailsError(true)

    if (details) {
      setIsSending(true)

      try {
        await api.post('/notes', {
          //title: title,
          details: details
          // category: category
        })

        router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Novo segredo | Tell me a secret</title>
      </Head>
      <Container>
        <Typography
          color="textSecondary"
          variant="h6"
          component="h2"
          gutterBottom
          pt={2}
        >
          Me conte um segredo
        </Typography>

        <Typography color="textSecondary" variant="body1">
          Me conte algo que ninguém saiba sobre você de forma totalmente
          anônima.
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* <TextField
            disabled={isSending}
            onChange={e => setTitle(e.target.value)}
            value={title}
            label="Título"
            fullWidth
            required
            sx={{ my: 2, display: 'block' }}
            error={titleError}
            helperText={titleError ? 'Campo obrigatório' : ''}
          /> */}

          <TextField
            disabled={isSending}
            onChange={e => setDetails(e.target.value)}
            value={details}
            label="Detalhes"
            fullWidth
            required
            multiline
            rows={6}
            sx={{ my: 2, display: 'block' }}
            error={detailsError}
            helperText={detailsError ? 'Campo obrigatório' : ''}
          />

          {/* <FormControl sx={{ my: 2, display: 'block' }}>
            <FormLabel>Note Category</FormLabel>

            <RadioGroup
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl> */}
          <LoadingButton
            type="submit"
            endIcon={<KeyboardArrowRightIcon />}
            loading={isSending}
            loadingPosition="end"
            variant="contained"
          >
            Enviar
          </LoadingButton>
        </form>

        {/* <CustomButton>Meu Botão</CustomButton> */}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}
