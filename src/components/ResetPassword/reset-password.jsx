import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants";
import Form from "../Form/form";
import { FormInput } from "../FormInput/form-input";
import { FormButton } from "../FormButton/form-button";

export const ResetPassword = () => {

	const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })


	const sendRegisterApi = (data) => {
		console.log(data)
	}


	const emailRegister = register('email', {
		required: {
			value: true,
			message: VALIDATE_CONFIG.requiredMessage
		},
		pattern: {
			value: EMAIL_REGEXP,
			message: VALIDATE_CONFIG.emailMessage
		}
	})


	return (
		<Form title='Восстановление пароля' handleFormSubmit={handleSubmit(sendRegisterApi)} >
			<p className="infoText" >Для получения временного пароля необходимо ввести email, указанный при регистрации</p>
			<FormInput
				{...emailRegister}
				id="email"
				type="text"
				placeholder="email"
			/>

			{errors?.email && <p className='errorMessage'> {errors?.email?.message}</p>}


			{errors?.password && <p className='errorMessage'> {errors?.password?.message}</p>}

			<p className="infoText" >Срок действия временного пароля 24 ч.</p>

			<FormButton color='yellow' type="submit">Отправить</FormButton>


		</Form>
	)
}