import "./index.css"
import { printNumerals } from "../../utils/index.js";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import {useSelector} from 'react-redux';

const SearchInfo = ({ searchText }) => {
	// const { cards } = useContext(CardContext);
	const products= useSelector(state=> state.products.data)
	const searchCount = products.length;

	return (
		searchText && <section className="search-title">

			По запросу <span> {searchText} </span> найдено {searchCount} {printNumerals(searchCount, ["товар", "товара", "товаров"])}.
		</section>
	);
};

export default SearchInfo;