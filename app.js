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
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  
  
    socket.on('leaveRoom', (num, name) => {        
      socket.leave(room[num], () => {        
        console.log(name + ' leave a ' + room[num]);
        io.to(room[num]).emit('leaveRoom', num, name);
      });
    });
  
  
    socket.on('joinRoom', (num, name) => {   
        a = num;     
      socket.join(room[num], () => {
        console.log(name + ' join a ' + room[num]);
        io.to(room[num]).emit('joinRoom', num, name);
      });
    });
  
  
    socket.on('chat message', (num, name, msg) => {
      a = num;
      io.to(room[a]).emit('chat message', name, msg);
    });
  });
  
  httpServer.listen(3000, () => logger.info('Server listening on port 3000'));
// const namespace1 = io.of('/namespace1');
// namespace1.on('connection', (socket) => {
//     socket.join('room1');    
//     namespace1.emit('news', { hello: "hello namespace1"});
// });

// const namespace2 = io.of('/namespace2');
// namespace2.on('connection', (socket) => {
//     namespace2.emit('news', { hello: "hello namespace2"});
// });

// io.on('connection', (socket) => {        
//     socket.on('message', (msg) => {
//         console.log(msg);
//         io.emit('message', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

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