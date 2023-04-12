import type { NextApiRequest, NextApiResponse } from 'next'
import Game from '../../../../models/game'
import { disConnectDB,connectDB} from '../../../../config/dbConnection'

const getAllGame = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB()
        const data = await Game.find({})
        disConnectDB()
        return res.status(200).json({ status: 200, message: 'Success', payload: data })
    } catch (error) {
        disConnectDB()
        return res.status(500).json({ status: 500, message: error })
    }
}

export default getAllGame 