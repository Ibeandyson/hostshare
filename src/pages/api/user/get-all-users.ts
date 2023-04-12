import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../../models/user'
import { disConnectDB, connectDB } from '../../../../config/dbConnection'

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB()
        const user = await User.find({})
        disConnectDB()
        return res.status(200).json({ status: 201, message: 'Success', payload: user })
    } catch (error) {
        disConnectDB()
        return res.status(500).json({ status: 500, message: error })
    }
}

export default getAllUsers 