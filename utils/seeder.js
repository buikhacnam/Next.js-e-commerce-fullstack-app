const Room = require('../models/room')
const mongoose = require('mongoose')
const rooms = require('../data/rooms')

mongoose.connect('mongodb+srv://dopestuff:mrbui123456@cluster0.qcbff.mongodb.net/next-cruise?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((con) => console.log('Connected to Local MongoDB')).catch((err) => console.log(err))

const seedRooms = async () => {
    try {
        await Room.deleteMany()
        console.log('rooms are deleted')
        await Room.insertMany(rooms)
        console.log('all rooms are added')
        process.exit()
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

seedRooms()