import { useState } from "react";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Logo from "../../components/Logo/logo";
import Product from "../../components/Product/product";
import Search from "../../components/Search/search";
import SearchInfo from "../../components/SearchInfo/search-info";
import Sort from "../../components/Sort/sort";
import Spinner from "../../components/Spinner";
import api from "../../utils/api";
import { isLiked } from "../../utils/product";

export const ProductPage = () => {

	const [searchQuery, setSearchQuery] = useState('');
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState(null);

	const handleRequest = () => { 
		setIsLoading(true);
		api.search(searchQuery)
		  .then((searchResult) => {
			console.log(searchResult)
		  })
		  .catch(err => console.log(err))
		  .finally(() => {
			 setIsLoading(false);
		  })
	 }
  
	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleRequest();
	 }
	 function handleProductLike(product) {
		const liked = isLiked(product.likes, currentUser._id)
		api.changeLikeProduct(product._id, liked)
		  .then((newProduct) => {
			setProduct(newProduct);
		  })
	 }
	 
	return (
		<>
			<Header>
				<>
					<Logo className="logo logo_place_header" href="/" />
					<Search onSubmit={handleFormSubmit} />
				</>
			</Header>

			<main className='content container'>

				<Sort />
				<div className='contents__card'>
				{isLoading
            ? <Spinner />
            : <Product/>
          }
					
				</div>
			</main>
			<Footer />
		</>
	);
}




