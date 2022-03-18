import { DeleteOutlined } from '@mui/icons-material'
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from '@mui/material'

type NoteCardProps = {
  id: number
  title: string
  category: string
  details: string
  handleDelete: (id: Number) => void
}

const NoteCard = ({
  id,
  title,
  category,
  details,
  handleDelete
}: NoteCardProps) => {
  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={title}
          subheader={category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoteCard
