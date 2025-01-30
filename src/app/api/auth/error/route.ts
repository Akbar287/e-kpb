import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { error } = req.query
    const redirectUrl = "/login?msg=" + error
    
    res.writeHead(302, { Location: redirectUrl })
    res.end()
}
