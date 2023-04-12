import mongoose from 'mongoose';
import { GameIProps } from '@/types/game';


const gameSchema = new mongoose.Schema<GameIProps>({
    name: {
        type: String,
        required: [true, 'Game name can not be empty']
    },
    category: {
        type: String,
        required: [true, 'Category can not be empty']
    },
    config: {
        display: {
            type: String,
            required: [true, 'display can not be empty']
        },
        playerLevel: {
            type: String,
            required: [true, 'Player level can not be empty']
        },
        playerNumber: {
            type: Number,
            required: [true, 'Player number can not be empty']
        }
    }

}, { timestamps: true })


if (mongoose.modelNames().includes('games')) {
    mongoose.deleteModel('games')
}
export default mongoose.model('games', gameSchema);
