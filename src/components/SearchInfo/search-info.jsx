import "./index.css"
import { printNumerals } from "../../utils/index.js";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";

const SearchInfo = ({ searchText }) => {
	const { cards } = useContext(CardContext);
	const searchCount = cards.length;
	return (
		searchText && <section className="search-title">

			По запросу <span> {searchText} </span> найдено {searchCount} {printNumerals(searchCount, ["товар", "товара", "товаров"])}.
		</section>
	);
};

export default SearchInfo;