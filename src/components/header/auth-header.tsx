import {cn} from '@/lib/utils';
import SearchForm from '../home/search-form';


const AuthHeader = ({classes}: {classes?: string}) => {
	return (
		<section
			className={cn(
				'h-[35vh] w-full flex flex-col items-center justify-end bg-red-400 bg-home pb-20',
				classes
			)}
		>
			<SearchForm />
		</section>
	);
};

export default AuthHeader;
