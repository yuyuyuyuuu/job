import { Server } from 'socket.io';

export const initializeSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('用户连接:', socket.id);

    // 加入聊天室
    socket.on('join-chat', (roomId) => {
      socket.join(roomId);
      console.log(`用户 ${socket.id} 加入聊天室 ${roomId}`);
    });

    // 发送消息
    socket.on('send-message', (data) => {
      io.to(data.roomId).emit('receive-message', data);
    });

    // 用户断开连接
    socket.on('disconnect', () => {
      console.log('用户断开连接:', socket.id);
    });
  });
};