import type { NextApiRequest, NextApiResponse } from 'next'
import { UserIProps } from '@/types/users'
import User from '../../../../models/user'
import { disConnectDB, connectDB } from '../../../../config/dbConnection'

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { firstName, lastName, email, address }: UserIProps = req.body.data
    try {
        await connectDB()
        const user = await User.create({ firstName: firstName, lastName: lastName, email: email, address: address })
        disConnectDB()
        return res.status(201).json({ status: 201, message: 'User Created Successfuly', payload: user })
    } catch (error) {
        disConnectDB()
        return res.status(500).json({ status: 500, message: error })
    }
}

export default createUser