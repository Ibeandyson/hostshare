import mongoose from 'mongoose';


const db = 'mongodb+srv://demo-dashoard:demo-dashoard@cluster0.uaxfkvr.mongodb.net/?retryWrites=true&w=majority'

export const connectDB = async () => {
  try {
    const conn : any = await mongoose.connect(db, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // return conn
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("db==",error);
  }
};

export const disConnectDB = async () => {
  try {
    const conn : any = await mongoose.disconnect()
    console.log(`MongoDB disConnected`);
  } catch (error) {
    console.error("db==",error);
  }
};

