import mongoose from 'mongoose';
import { UserIProps } from '@/types/users';


const userSchema = new mongoose.Schema<UserIProps>({
  firstName: {
    type: String,
    required: [true, 'firstName can not be empty']
  },
  lastName: {
    type: String,
    required: [true, 'lastName can not be empty']
  },
  address: {
    type: String,
    required: [true, 'address can not be empty']
  },
  email: {
    type: String,
    required: [true, 'email can not be empty']
  }

}, { timestamps: true })


if (mongoose.modelNames().includes('users')) {
  mongoose.deleteModel('users')
}
export default mongoose.model('users', userSchema);
