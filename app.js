import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import apiRouter from './routers/web.js';
import { logger } from './config/winston.js';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.use("/", apiRouter);

let room = ['room1', 'room2'];
let a = 0;

io.on('connection', (socket) => {
    const { userUrl } = socket.request;
    const videoInfo = {};

    console.log('연결됨 : '+userUrl);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });  

    socket.on('joinRoom', (room) => {
        let roomInfo = {};
        roomInfo.videoUrl = videoInfo.videoUrl;
        roomInfo.roomName = room;   
        roomInfo.videoFrame = videoInfo.keyFrame;

        socket.join(room);
        let clientCount = io.sockets.adapter.rooms.get(room).size;            
        if(clientCount > 1) io.to(room).emit('joinResult', roomInfo);
    });

    socket.on('sendVideoUrl', (url, room) => {        
        videoInfo.videoUrl = url;
        io.to(room).emit('getVideoInfo', videoInfo);
    });  

    socket.on('sendBuffer', (time, room) => {
        videoInfo.keyFrame = time;
        io.to(room).emit('getVideoTime', videoInfo);
    });

    socket.on('liveKeyFrame', (time) => {
        videoInfo.keyFrame = time;
    });
});
  
  httpServer.listen(3000, () => logger.info('Server listening on port 3000'));

/* ▼ 2022-05-11 공통 에러 처리 by 정민교 ▼ */
process.on('uncaughtException', (err) => {
    logger.error('an uncaught exception detected : ', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error('an unhandled rejection detected : ', err);
    process.exit(1);
});
/* ▲ 2022-05-11 공통 에러 처리 by 정민교 ▲ */

export default app;