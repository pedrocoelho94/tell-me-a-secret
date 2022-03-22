import { Container, Grid } from '@mui/material'
import { GetStaticProps } from 'next'
import NoteCard from '../components/NoteCard'
import { api } from '../helpers/axios'
import { useState } from 'react'
import Masonry from 'react-masonry-css'
import Head from 'next/head'

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

  const breakpoints = {
    default: 3,
    1300: 2,
    900: 1
  }

  return (
    <>
      <Head>
        <title>All Notes - Note App</title>
      </Head>
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(note => (
            <div key={note.id}>
              <NoteCard
                handleDelete={handleDelete}
                title={note.title}
                category={note.category}
                details={note.details}
                id={note.id}
              />
            </div>
          ))}
        </Masonry>
      </Container>
    </>
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
