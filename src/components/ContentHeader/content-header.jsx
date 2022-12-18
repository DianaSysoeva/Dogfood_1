import s from './index.module.css';
import { useNavigate } from 'react-router-dom'

export const ContentHeader = ({title, children}) => {
	const navigate = useNavigate();
	return (
		<div>
				<a href="#" className={s.buttonBack} onClick={()=> navigate(-1)}>Назад</a>
				<h1 className={s.productTitle}>{title}</h1>
				{children}
			</div>
		
		)
}
