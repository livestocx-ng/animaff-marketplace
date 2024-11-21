import {Testimonials} from '@/data';
import TestimonialCard from './testimonial-card';
import {useGlobalStore} from '@/hooks/use-global-store';
import DefaultTestimonialCard from '@/components/common/default-testimonial-card';

const TestimonialSection = () => {
	const {testimonials} = useGlobalStore();

	return (
		<div className='flex items-center justify-between flex-wrap gap-y-2 sm:gap-y-5 px-4 md:px-8 py-5 bg-white'>
			{testimonials?.length === 0 ? (
				<>
					{Testimonials.map((testimonial) => (
						<DefaultTestimonialCard
							key={testimonial.id}
							data={testimonial}
						/>
					))}
				</>
			) : (
				<>
					{testimonials?.slice(0, 3).map((testimonial) => (
						<TestimonialCard
							data={testimonial}
							key={testimonial.id}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default TestimonialSection;
