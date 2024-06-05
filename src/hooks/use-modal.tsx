import { Media } from '@/types/types';
import {create} from 'zustand';

interface useModalStore {
	type: 'PRODUCT' | 'OTHER';
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export const useModal = create<useModalStore>((set) => ({
	type: 'PRODUCT',
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));
