import { DeleteOutlined } from '@mui/icons-material'

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography
} from '@mui/material'
import { yellow, blue, pink } from '@mui/material/colors'

type NoteCardProps = {
  id: string
  title: string
  category?: string
  details: string
  handleDelete?: (id: Number) => void
}

type CategoryProps = {
  category: string
}

const AvatarCustom = styled(Avatar)<CategoryProps>`
  ${({ category }) => `
    ${category === 'work' && `background-color: ${yellow[700]}`};
    ${category === 'money' && `background-color: ${blue[500]}`};
    ${category === 'todos' && `background-color: ${pink[500]}`};
  `}
`

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
          // avatar={
          //   <AvatarCustom category={category}>
          //     {category[0].toUpperCase()}
          //   </AvatarCustom>
          // }
          // action={
          //   <IconButton onClick={() => handleDelete(id)}>
          //     <DeleteOutlined />
          //   </IconButton>
          // }
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
