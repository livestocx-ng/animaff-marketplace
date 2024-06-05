/* eslint-disable react-hooks/exhaustive-deps */
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Dispatch, MouseEvent, SetStateAction, useState} from 'react';

const PaginationButton = ({
	data,
	setCurrentPageFetch,
}: {
	data: any[];
	setCurrentPageFetch: Dispatch<SetStateAction<number>>;
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);

	// page limiters
	const [pageNumberLimit, setPageNumberLimit] = useState(1);
	const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
	const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

	const pages = [];

	for (let i = 1; i <= Math.ceil(data?.length / itemsPerPage); i++) {
		pages.push(i);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	// useEffect(() => {
	//     setCurrentData(data?.slice(indexOfFirstItem, indexOfLastItem))
	// }, [data, indexOfFirstItem, indexOfLastItem])

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		// // console.log('::current page ', Number(e.target.id))
		setCurrentPage(Number(e.currentTarget.id));
		// setCurrentPageFetch(Number(e.currentTarget.id) - 1);
		setCurrentPageFetch(Number(e.currentTarget.id));
	};

	const handlePreviousClick = () => {
		setCurrentPage(currentPage - 1);
		// console.log(currentPage - 2, ':: current page');
		setCurrentPageFetch(currentPage - 2);

		if ((currentPage - 1) % pageNumberLimit === 0) {
			setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
		}
	};

	const handleNextClick = () => {
		setCurrentPage(currentPage + 1);
		// console.log(currentPage, ':: current page');
		setCurrentPageFetch(currentPage);

		if (currentPage + 1 > maxPageNumberLimit) {
			setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
			setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
		}
	};

	let pageDecrementBtn = null;
	if (minPageNumberLimit >= 1) {
		pageDecrementBtn = (
			<li className='cursor-pointer' onClick={handlePreviousClick}>
				&hellip;
			</li>
		);
	}

	let pageIncrementBtn = null;
	if (pages.length > maxPageNumberLimit) {
		pageIncrementBtn = (
			<li className='cursor-pointer' onClick={handleNextClick}>
				&hellip;
			</li>
		);
	}

	return (
		<div className='flex justify-start w-full pb-20 bg-green-40'>
			{data?.length > 0 && (
				<ul className='flex justify-center my-10 space-x-1'>
					<button
						onClick={handlePreviousClick}
						disabled={currentPage === pages[0]}
						className='text-slate-400 text-[12px] hover:text-slate-600 cursor-pointer hover:-translate-x-1 duration-700 ease-in-out'
					>
						<ChevronLeft size={25} />
					</button>

					{pageDecrementBtn}

					{pages?.map((page, index) => (
						<div key={index}>
							{page < maxPageNumberLimit + 1 &&
								page > minPageNumberLimit && (
									<li
										key={index}
										id={page.toString()}
										onClick={handleClick}
										className={`flex items-center cursor-pointer text-[12px] px-2 h-[25px] rounded-lg ${
											currentPage === page
												? 'border border-sky-200 bg-sky-200 text-sky-600 font-bold'
												: 'border border-sky-600 text-sky-600 font-medium'
										}`}
									>
										{page}
									</li>
								)}
						</div>
					))}

					{pageIncrementBtn}

					<button
						onClick={handleNextClick}
						disabled={currentPage === pages[pages.length - 1]}
						className=' text-slate-400 text-[12px] hover:text-slate-600 cursor-pointer hover:translate-x-1 duration-700 ease-in-out'
					>
						<ChevronRight size={25} />
					</button>
				</ul>
			)}
		</div>
	);
};

export default PaginationButton;
