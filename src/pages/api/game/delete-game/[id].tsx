import type { NextApiRequest, NextApiResponse } from 'next';
import Game from '../../../../../models/game';
import { disConnectDB, connectDB} from '../../../../../config/dbConnection';

const editGame = async (req: NextApiRequest, res: NextApiResponse) => {
  let _id = req.query.id;
  try {
    await connectDB();
    const game = await Game.findById({ _id: _id });
    if (!game) {
      return res.status(400).json({ status: 400, message: `No game found for ${_id}`, success: false });
    }
    const data = await Game.findOneAndDelete({ _id: _id });
    disConnectDB()
    return res.status(201).json({ status: 201, message: 'Game Deleted Successfuly', payload: data });
  } catch (error) {
    disConnectDB()
    return res.status(500).json({ status: 500, message: error });
  }
};

export default editGame;
