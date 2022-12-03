import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Logo from "../../components/Logo/logo";
import { NotFound } from "../../components/NotFound/not-found";
import Product from "../../components/Product/product";
import Search from "../../components/Search/search";
import SearchInfo from "../../components/SearchInfo/search-info";
import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";


export const ProductPage = ({currentUser, isLoading}) => {
	const {productId}= useParams();
	const [errorState, setErrorState] = useState(null);
	const [product, setProduct] = useState(null);


	const handleProductLike = useCallback(() => {
		const liked = isLiked(product.likes, currentUser._id)
		api.changeLikeProduct(product._id, liked)
			.then((newProduct) => {
				setProduct(newProduct);
			})
	}, [product, currentUser])

	useEffect(() => {
		// setIsLoading(true);
   api.getProductById(productId)
			.then((productsData) => {
				// setCurrentUser(userData)
				setProduct(productsData)
			})
			.catch(err => setErrorState(err))
			// .finally(() => {
			// 	setIsLoading(false);
			// })

	}, [])

	return (
		<>
			
			
				<div className='contents__card'>
					{isLoading
						? <Spinner />
						: !errorState && <Product {...product} currentUser={currentUser} onProductLike={handleProductLike} />
					}
					{!isLoading && errorState && <NotFound/>}
				</div>
			
		</>
	);
}




