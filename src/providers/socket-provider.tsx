'use client';
import {Socket, io} from 'socket.io-client';
import {Fragment, useEffect} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';

let SocketInstance: Socket;

const SocketProvider = ({children}: {children: React.ReactNode}) => {
	const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_API_URL ?? '';

	// console.log('[SOCKET-SERVER-URL] :: ', SOCKET_URL);

	const {user, updateSocketInstance} = useGlobalStore();

	useEffect(() => {
		SocketInstance = io(SOCKET_URL, {
			// forceNew: true,
			// host: SOCKET_URL,
			upgrade: true,
			secure: true,
			transports: ['websocket'],
		});
	}, []);

	useEffect(() => {
		SocketInstance = io(SOCKET_URL, {
			// forceNew: true, // Try commenting this out for testing
			upgrade: true,
			transports: ['websocket'],
		});

		SocketInstance.on('connect', () => {
			console.log('[SOCKET-CONNECTED]');

			updateSocketInstance(SocketInstance);

			// console.log('[SOCKET-USER] :: ', user?.id);

			if (user) {
				SocketInstance.emit('USER-SIGNIN', {userId: user.id});
			}
		});

		SocketInstance.on('connect_error', (error) => {
			console.log(`[SOCKET-CONNECTION-CAUSE] :: ${error.cause}`);
			console.log(`[SOCKET-CONNECTION-ERROR] :: ${error.message}`);
		});

		// Cleanup function for disconnection (optional)
		return () => {
			SocketInstance.on('disconnect', () => {
				console.log('[SOCKET-DISCONNECTED]');
			});
		};
	}, [user]);

	return <Fragment>{children}</Fragment>;
};

export function getSocketInstance() {
	return SocketInstance;
}

export default SocketProvider;
