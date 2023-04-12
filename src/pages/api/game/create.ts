import type { NextApiRequest, NextApiResponse } from 'next'
import { GameIProps } from '@/types/game'
import Game from '../../../../models/game'
import { disConnectDB, connectDB} from '../../../../config/dbConnection'

const createGame = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, category, config }: GameIProps = req.body.data
    try {
        await connectDB()
        const user = await Game.create({ name: name, category: category, config: { playerLevel: config.playerLevel, playerNumber: config.playerNumber, display: config.display } })
        disConnectDB()
        return res.status(201).json({ status: 201, message: 'Game Created Successfuly', payload: user })

    } catch (error) {
        disConnectDB()
        return res.status(500).json({ status: 500, message: error })
    }
}

export default createGame 