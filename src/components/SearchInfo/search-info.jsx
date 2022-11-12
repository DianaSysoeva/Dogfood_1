import "./index.css"
import { printNumerals } from "../../utils/index.js";

const SearchInfo = ({ searchText, searchCount }) => {

	return (
		searchText && <section className="search-title">

			По запросу <span> {searchText} </span> найдено {searchCount} {printNumerals(searchCount, ["товар", "товара", "товаров"])}.
		</section>
	);
};

export default SearchInfo;