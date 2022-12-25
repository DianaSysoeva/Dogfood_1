import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { NotFound } from '../NotFound/not-found';
import Card from '../Card/card';
import './index.css';


const CardList = ({cards}) => {
	const navigate = useNavigate();
	// const  {isLoading} = useContext(UserContext);
	const loading = useSelector(state=> state.products.loading);
	return (
		
			<>
				{!cards.length && !loading && <NotFound buttonText="Назад" title="Извините, по вашему запросу ничего не найдено" buttonAction={()=>navigate(-1)}/>}
				<div className="cards">
					{
						cards.map((item, index) => <Card key={item._id} {...item} />)
					}
				</div>
			</>
		);
	};
	
	export default CardList;
	
