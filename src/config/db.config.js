import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY)
    console.log('MongoDB connected')
  } catch (err) {
    console.log('error occured', err)
  }
}

export default connection
