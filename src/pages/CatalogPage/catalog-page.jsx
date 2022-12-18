import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext";

export const CatalogPage = ({isLoading}) => {
	const { cards } = useContext(CardContext);
	return (
		<>
			<Sort />
			<div className='contents__card'>
				{isLoading
					? <Spinner />
					: <CardList cards = {cards} />
				}
			</div>

		</>
	)

}
