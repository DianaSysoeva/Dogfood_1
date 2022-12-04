import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"

export const CatalogPage = ({isLoading}) => {

	return (
		<>
			<Sort />
			<div className='contents__card'>
				{isLoading
					? <Spinner />
					: <CardList />
				}
			</div>

		</>
	)

}
