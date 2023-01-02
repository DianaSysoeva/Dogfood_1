import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import {  INITIAL_VALUE_RATING, VALIDATE_CONFIG } from "../../utils/constants";
import Form from "../Form/form";
import { FormInput } from "../FormInput/form-input";
import { FormButton } from "../FormButton/form-button";
import {fetchCreateReview} from '../../storage/singleProduct/singleProductSlice';
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { Rating } from "../Rating/rating";
import api from "../../utils/api"

export const FormReview = ({ title = "Отзыв о товаре", productId, setProduct }) => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
	const [rating, setRating] = useState(1)
	const dispatch = useDispatch();

	const sendReviewProduct = (data) => {
		dispatch(fetchCreateReview({ productId, data: { ...data, rating } }))
			.then(() => {
				reset();
				setRating(INITIAL_VALUE_RATING)
			})

		}
	// const sendReviewProduct = (data) => {
	// 	api.createReviewProduct(productId, {...data, rating})
	// 		.then(newProduct => {
	// 			setProduct && setProduct(newProduct)
	// 		})

	// }

	
	const textReview = register('text', {
				required: {
					value: true,
					message: VALIDATE_CONFIG.requiredMessage
				},

			})


	return (
		<Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)} >
			<Rating rating={rating} isEditable setRating={setRating} />
			<FormInput
				{...textReview}
				id="text"
				typeinput="textarea"
				placeholder="Напишите текст отзыва"
			/>

			{errors?.email && <p className='errorMessage'> {errors?.email?.message}</p>}

			<FormButton color='yellow' type="submit">Отправить отзыв</FormButton>

		</Form>
	)
}