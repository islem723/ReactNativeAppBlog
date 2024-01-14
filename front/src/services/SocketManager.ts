import { Manager, io } from 'socket.io-client';
import { BASE_URL } from '../utils/consts';

const manager = new Manager(BASE_URL, {
  autoConnect: true,
  reconnection: true,
});

const socket = manager.socket('/');

manager.open((err) => {
  if (err) {
    console.log(`Cannot open socket: ${err}`);
  } else {
    console.log('Connected');
  }
});

export default socket;
