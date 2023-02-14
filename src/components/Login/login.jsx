import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants";
import Form from "../Form/form";
import { FormInput } from "../FormInput/form-input";
import { FormButton } from "../FormButton/form-button";
import './index.css';
import { userAuthenticate } from "../../storage/user/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
	const location = useLocation();
	const initialPath = location.state?.initialPath;
	const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const sendRegisterApi = (data) => {
		console.log(data);
      dispatch(userAuthenticate(data))
	}

	const handleClickResetButton = (e) => {
		e.preventDefault()
		navigate('/reset-password', { replace: true, state: { backgroundLocation: location, initialPath } })
	}
	const handleClickRegistrationButton = (e) => {
		e.preventDefault()
		navigate('/register', { replace: true, state: { backgroundLocation: location, initialPath } })
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
	const passwordRegister = register('password', {
		required: {
			value: true,
			message: VALIDATE_CONFIG.requiredMessage
		},
		pattern: {
			value: PASSWORD_REGEXP,
			message: VALIDATE_CONFIG.passwordMessage
		}
	})


	return (
		<div className="login-page">
		<Form title='Вход' handleFormSubmit={handleSubmit(sendRegisterApi)} >
			<FormInput
				{...emailRegister}
				id="email"
				type="text"
				placeholder="email"
			/>

			{errors?.email && <p className='errorMessage'> {errors?.email?.message}</p>}

			<FormInput
				{...passwordRegister}
				id="password"
				type="password"
				placeholder="Пароль"

			/>
			{errors?.password && <p className='errorMessage'> {errors?.password?.message}</p>}

			<p className="infoText link" onClick={handleClickResetButton} >Воccтановить пароль</p>

			<FormButton color='yellow' type="submit">Войти</FormButton>
			<FormButton color='white' type="button" onClick={handleClickRegistrationButton} >Регистрация</FormButton>


		</Form>
		</div>
	)
}