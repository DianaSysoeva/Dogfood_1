import { useContext } from "react"
import CardList from "../../components/CardList/card-list"
import { ContentHeader } from "../../components/ContentHeader/content-header"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext"
import { useSelector } from 'react-redux'

export const FavoritePage = ({ isLoading }) => {
	// const {favorites} = useContext(CardContext);
	const favorites = useSelector(state => state.products.favoriteProducts)
	return (
		<div className="container container_inner">
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
