import { useContext } from "react"
import { useSelector } from "react-redux"
import CardList from "../../components/CardList/card-list"
import { ContentHeader } from "../../components/ContentHeader/content-header"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext"


export const FavoritePage = ({ isLoading }) => {
	// const { favoriteCard } = useContext(CardContext);
	const favorites = useSelector(state => state.products.favoriteProducts)
	return (
		<div className="container container_inside">
			<ContentHeader title="Избранное" />
			<Sort />
			<div className='contents__card'>
				{isLoading
					? <Spinner />
					: <CardList cards={favorites} />
				}
			</div>

		</div>
	)

}
