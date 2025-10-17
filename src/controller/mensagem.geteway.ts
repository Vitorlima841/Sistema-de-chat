import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MensagemGeteway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private usuarios: Map<number, string> = new Map();

    handleConnection(socket: Socket) {
        const usuarioId = Number(socket.handshake.query.userId);
        if (usuarioId) {
            this.usuarios.set(usuarioId, socket.id);
            console.log(`Usuario ${usuarioId} conectado`);
        }
    }

    handleDisconnect(socket: Socket) {
        const usuarioId = [...this.usuarios.entries()].find(([, id]) => id === socket.id)?.[0];
        if (usuarioId) this.usuarios.delete(usuarioId);
    }

    enviaMensagemDireta(receiverId: number, message: string) {
        const socketId = this.usuarios.get(receiverId);
        if (socketId) {
            this.server.to(socketId).emit('mensagemDireta', message);
        }
    }
}
