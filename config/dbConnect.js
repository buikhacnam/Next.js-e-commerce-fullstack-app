import mongoose from 'mongoose'

const dbConnect = () => {
    // if connection to mongodb is not ready yet
    if (mongoose.connection.readyState >= 1) {
        return
    }
    mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((con) => console.log('Connected to Local MongoDB')).catch((err) => console.log(err))
}

export default dbConnect