import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import { CardContext } from "../../context/cardContext";

export const CatalogPage = () => {
	const { cards } = useContext(CardContext);

	return (
		<div className="container container_inside">
			<Sort />
			<div className='contents__card'>
				<CardList cards={cards} />
			</div>

		</div>
	)

}
