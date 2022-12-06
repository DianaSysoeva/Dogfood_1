import { useContext } from "react";
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
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { useApi } from "../../hooks/useApi.js";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";


export const ProductPage = () => {
	const { productId } = useParams();
	const { handleLike } = useContext(CardContext);
	// const [errorState, setErrorState] = useState(null);
	// const [product, setProduct] = useState(null);

	const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);


	const {
		data: product,
		setData: setProduct,
		loading: isLoading,
		error: errorState

	} = useApi(handleGetProduct)

	const handleProductLike = useCallback(() => {
		handleLike(product).then((updateProduct) => {
			setProduct(updateProduct)
		});

	}, [product, handleLike, setProduct])

	return (
		<>

			<div className='contents__card'>
				{isLoading
					? <Spinner />
					: !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike} />
				}
				{!isLoading && errorState && <NotFound />}
			</div>

		</>
	);
}




