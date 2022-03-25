import { Button, Container, Grid, Stack } from '@mui/material'
import { GetStaticProps } from 'next'
import NoteCard from '../components/NoteCard'
import { useState } from 'react'
//import Masonry from 'react-masonry-css'
import Head from 'next/head'
import { fauna } from '../helpers/fauna'
import { query as q } from 'faunadb'

import { Box } from '@mui/system'
import { LoadingButton } from '@mui/lab'
import ClientOnly from '../components/ClientOnly'
import { useRouter } from 'next/router'

type SecretProps = {
  ref: {
    id: string
  }
  ts: number
  data: {
    title: string
    details: string
    likes: number
    createdAt: string
  }
}

type Secret = {
  id: string
  title: string
  details: string
  likes: number
  createdAt: string
}

type HomeProps = {
  data: Secret[]
}

type SecretsFetch = {
  data: SecretProps[]
  after?: unknown
  before?: unknown
}

export default function Home({ data }: HomeProps) {
  const router = useRouter()

  const [secrets, setSecrets] = useState(() => [
    data[Math.floor(Math.random() * data.length)]
  ])
  const [loading, setLoading] = useState(false)

  // const handleDelete = async (id: Number) => {
  //   await api.delete('/notes/' + id)

  //   const newNotes = notes.filter(note => note.id != id)
  //   setNotes(newNotes)
  // }

  const handleClick = () => {
    setLoading(true)

    const randonIndex = Math.floor(Math.random() * data.length)
    console.log(randonIndex)

    setSecrets(() => [data[randonIndex]])
    setLoading(false)
  }

  // const breakpoints = {
  //   default: 3,
  //   1300: 2,
  //   900: 1
  // }

  return (
    <>
      <Head>
        <title>Descubra | Tell me a secret</title>
      </Head>

      <ClientOnly>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: `calc(100% - 64px)`
          }}
        >
          {/* <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {secrets?.map(secret => (
            <div key={secret.id}>
              <NoteCard
                // handleDelete={handleDelete}
                title={secret.title}
                details={secret.details}
                id={secret.id}
              />
            </div>
          ))}
        </Masonry> */}

          <Stack spacing={2} pt={4} direction={{ xs: 'column' }} mx="auto">
            <Button
              onClick={() => router.push('/create')}
              sx={{ display: { xs: 'block', sm: 'none' } }}
              variant="outlined"
            >
              Enviar segredo
            </Button>
            <LoadingButton
              onClick={handleClick}
              loading={loading}
              variant="outlined"
            >
              Me conte um novo segredo
            </LoadingButton>
          </Stack>

          {secrets?.map(secret => (
            <Box key={secret.id} maxWidth={600} mx="auto" py={4}>
              <NoteCard
                // handleDelete={handleDelete}
                title={secret.title}
                details={secret.details}
                id={secret.id}
              />
            </Box>
          ))}
        </Container>
      </ClientOnly>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let allSecrets = [] as Secret[]

  const response = await fauna.query<SecretsFetch>(
    q.Reverse(
      q.Map(
        q.Paginate(q.Match(q.Index('all_secrets'))),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    )
  )

  if (response.data.length) {
    allSecrets = response.data.map(secret => ({
      id: secret.ref.id,
      title: secret.data.title,
      details: secret.data.details,
      likes: secret.data.likes,
      createdAt: secret.data.createdAt
    }))
  } else {
    allSecrets = []
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(allSecrets))
    }
  }
}
