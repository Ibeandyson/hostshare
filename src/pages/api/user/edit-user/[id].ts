import type { NextApiRequest, NextApiResponse } from 'next'
import { UserIProps } from '@/types/users'
import User from '../../../../../models/user'
import { disConnectDB, connectDB } from '../../../../../config/dbConnection'

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    let _id = req.query.id
    const { firstName, lastName, email, address }: UserIProps = req.body.data
    try {
        await connectDB()
        const _user = await User.findById({ _id: _id })
        if (!_user) {
            return res.status(400).json({ status: 400, message: `No user found for ${_id}`, success: false });
        }
        const user = await User.findByIdAndUpdate({ _id: _id }, { firstName: firstName, lastName: lastName, email: email, address: address })
        disConnectDB()
        return res.status(201).json({ status: 201, message: 'User Updated Successfuly', payload: user })
    } catch (error) {
        disConnectDB()
        return res.status(500).json({ status: 500, message: error })
    }
}

export default createUser