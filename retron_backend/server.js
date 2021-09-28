const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// bring routes
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/room')

// app
const app = express();
// db
mongoose
    .connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB connected'))
    .catch(err => {
        console.log(err);
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// routes middleware
app.use('/api', authRoutes);
app.use('/api', roomRoutes)

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const io = require("socket.io")(8900, {
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });
// io.on("connection", socket => {
//     console.log('user connected')
//     socket.on('new_message', ({message}) => {
//         console.log(message);
//     })
// })
