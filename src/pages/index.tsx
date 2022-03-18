import { Container, Grid } from '@mui/material'
import { GetStaticProps } from 'next'
import NoteCard from '../components/NoteCard'
import { api } from '../helpers/axios'
import { useState } from 'react'

type Notes = {
  title: string
  details: string
  category: string
  id: number
}

type HomeProps = {
  data: Notes[]
}

export default function Home({ data }: HomeProps) {
  const [notes, setNotes] = useState(data)

  const handleDelete = async (id: Number) => {
    await api.delete('/notes/' + id)

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid key={note.id} item xs={12} md={6} lg={4}>
            <NoteCard
              handleDelete={handleDelete}
              title={note.title}
              category={note.category}
              details={note.details}
              id={note.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/notes')
  const notes = response.data

  return {
    props: {
      data: notes
    }
  }
}
