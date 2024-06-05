import React, {useState} from 'react';
import {PromotionPlan} from '@/types/types';
import {ChevronDown} from 'lucide-react';
import {useGlobalStore} from '@/store/use-global-store';

interface PromotionPlanCardProps {
	plan: PromotionPlan;
}

const PromotionPlanCard = ({plan}: PromotionPlanCardProps) => {
	const [showPlanDetails, setShowPlanDetails] = useState<boolean>(false);

	const {currentPromotionPlan, updateCurrentPromotionPlan} = useGlobalStore();

	return (
		<div
			className={`border shadow-md ${
				plan.id === currentPromotionPlan
					? 'border-green-300 shadow-green-100'
					: 'border-slate-400 shadow-slate-200'
			} rounded-md w-[450px] p-4 flex flex-col`}
		>
			<div
				onClick={() => {
					updateCurrentPromotionPlan(plan.id);
				}}
				className='flex items-center space-x-4 cursor-pointer hover:translate-x-1 transition-all duration-700'
			>
				<div
					className={`relative border ${
						plan.id === currentPromotionPlan
							? 'border-green-500'
							: 'border-gray-500'
					} rounded-full h-4 w-4`}
				>
					<div
						className={`absolute top-[1px] left-[1px] h-3 w-3 ${
							plan.id === currentPromotionPlan
								? 'bg-green-500'
								: 'bg-slate-100'
						} rounded-full transition-all duration-700`}
					/>
				</div>

				<div className='flex flex-col space-y-1'>
					<h1 className='font-medium text-sm'>{plan.title}</h1>
					<p className='text-xs'>{plan.description}</p>
				</div>
			</div>

			<div
				onClick={() => {
					setShowPlanDetails(!showPlanDetails);
				}}
				className='text-sm font-medium mt-5 flex justify-between items-center cursor-pointer'
			>
				<p>Plan Details</p>

				<ChevronDown size={14} />
			</div>

			{showPlanDetails && (
				<div className='flex flex-col px-4 space-y-4'>
					{plan.plan_info.map((info) => (
						<ul key={info.id} className='flex flex-col list-disc'>
							<li className='text-xs font-medium'>
								{info.title}
							</li>
							<p className='text-xs leading-6'>
								{info.description}
							</p>
						</ul>
					))}
				</div>
			)}
		</div>
	);
};

export default PromotionPlanCard;
