import type { NextApiRequest, NextApiResponse } from 'next'
import { GameIProps } from '@/types/game'
import Game from '../../../../../models/game'
import { disConnectDB, connectDB } from '../../../../../config/dbConnection'

const editGame = async (req: NextApiRequest, res: NextApiResponse) => {
    let _id = req.query.id
    const { name, category, config }: GameIProps = req.body.data
    try {
        await connectDB()
        const game = await Game.findById({ _id: _id })
        if (!game) {
            return res.status(400).json({ status: 400, message: `No game found for ${_id}`, success: false });
        }
        const data = await Game.findByIdAndUpdate({ _id: _id }, { name: name, category: category, config: { playerLevel: config.playerLevel, playerNumber: config.playerNumber, display: config.display } })
        disConnectDB()
        return res.status(201).json({ status: 201, message: 'Game Update Successfuly', payload: data })
    } catch (error) {
        return res.status(500).json({ status: 500, message: error })
    }
}

export default editGame 