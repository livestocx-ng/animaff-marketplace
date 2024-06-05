import {Loader2} from 'lucide-react';

export default function ButtonLoader() {
	return (
		<div className='loader-container'>
			<Loader2 className='text-white h-6 w-6 rotate-infinite' />
		</div>
	);
}
