import type { NextApiRequest, NextApiResponse } from 'next'

type Response = {
    message: string
}

export default function handler(res: NextApiResponse<Response>) {
    res.status(200).json({ message: "success" })
}