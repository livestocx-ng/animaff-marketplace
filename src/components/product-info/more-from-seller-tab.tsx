'use client';
import {usePathname} from 'next/navigation';
import {useGlobalStore} from '@/store/use-global-store';
import ProductCard from '@/components/cards/product-card';
import SellerProductCard from '../cards/seller-product-card';
import MarketPlaceProductCard from '../cards/marketplace-product-card';

const MoreFromSellerTab = () => {
	const pathName = usePathname();

	// // console.log(pathName);

	const {productInfo} = useGlobalStore();

	return (
		<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-5'>
			{productInfo?.moreProducts?.slice(0, 10).map((product) => {
				return <ProductCard key={product.id} product={product} />;
				// if (!pathName.includes('marketplace')) {
				// }
				// if (pathName.includes('marketplace')) {
				// 	return <MarketPlaceProductCard key={product.id} product={product} />;
				// }
				// if (pathName.includes('sellers')) {
				// 	return <SellerProductCard key={product.id} product={product} />;
				// }
			})}
		</div>
	);
};

export default MoreFromSellerTab;
