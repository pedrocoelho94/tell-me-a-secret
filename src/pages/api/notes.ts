/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { fauna } from '../../helpers/fauna'
import { query as q, ToString } from 'faunadb'

type DataProps = {
  title: string
  details: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body as DataProps

    try {
      await fauna.query<DataProps>(
        q.Create(q.Collection('secrets'), {
          data: {
            title: data.title,
            details: data.details,
            likes: 0,
            createdAt: ToString(q.Now())
          }
        })
      )

      await res.unstable_revalidate('/')

      return res.status(200).json({ ok: true })
    } catch (error) {
      console.log(error)
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method Not Allowed`)
  }
}
