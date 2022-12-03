import Card from '../Card/card';
import './index.css';


const CardList = ({goods}) => {

	return (

		<div className="cards">
			{
				goods.map((item, index) => <Card key={item._id} {...item} />)

			}
		</div>
	);
};

export default CardList;
