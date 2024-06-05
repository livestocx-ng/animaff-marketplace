import {Testimonials} from '@/data';
import TestimonialCard from '@/components/common/testimonial-card';

const TestimonialSection = () => {
	return (
		<div className='flex items-center justify-between flex-wrap px-4 md:px-8 py-10 bg-white'>
			{Testimonials.map((testimonial) => (
				<TestimonialCard key={testimonial.id} data={testimonial} />
			))}
		</div>
	);
};

export default TestimonialSection;
