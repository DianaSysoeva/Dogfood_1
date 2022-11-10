import Card from '../Card/card';
import './index.css';
import data from "../../assets/data.json"

function CardList() {
	console.log(data);
	return (
		
			// {/* <Card
			// 	name="Рога"
			// 	price="350"
			// 	discount="15"
			// 	wight="1 шт."
			// 	description="Описание"
			// 	picture="https://react-learning.ru/image-compressed/3.jpg" /> */}
		<div className='cards'>
		{
			data.map(item => <Card {...item} />)

		}
</div>
	);
};

export default CardList;
