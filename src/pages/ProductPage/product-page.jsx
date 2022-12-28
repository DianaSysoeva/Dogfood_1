import { useContext } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound/not-found";
import Product from "../../components/Product/product";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { useApi } from "../../hooks/useApi.js";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleProduct, setProductState } from '../../storage/singleProduct/singleProductSlice'
import { fetchChangeLikeProduct } from '../../storage/products/productsSlice'

export const ProductPage = () => {
	const { productId } = useParams();

	// const { handleLike } = useContext(CardContext);
	// const [errorState, setErrorState] = useState(null);
	// const [product, setProduct] = useState(null);
	// const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);

	const dispatch = useDispatch();
	const { data: product, loading: isLoading, error: errorState } = useSelector(state => state.singleProduct)

	// const {
	// 	data: product,
	// 	setData: setProduct,
	// 	loading: isLoading,
	// 	error: errorState

	// } = useApi(handleGetProduct)

	useEffect(() => {
		dispatch(fetchSingleProduct(productId))
	}, [dispatch, productId]);



	const handleProductLike = useCallback(() => {
		dispatch(fetchChangeLikeProduct(product))
			.then(updateProduct => {
				dispatch(setProductState(updateProduct.payload.product))
			})
	}, [product, dispatch])

	// const handleProductLike = useCallback(() => {
	// 	handleLike(product).then((updateProduct) => {
	// 		setProduct(updateProduct.payload.product)
	// 	});

	// }, [product, handleLike, setProduct])

	return (
		<div className="container container_inner">

			<div className='contents__card'>
				{isLoading
					? <Spinner />
					: !errorState && <Product {...product} onProductLike={handleProductLike} />
				}
				{!isLoading && errorState && <NotFound />}
			</div>

		</div>
	);
}




