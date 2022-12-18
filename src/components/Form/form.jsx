// import { useState } from 'react';
import './style.css';
// import { useForm } from 'react-hook-form';
// import { FormInput } from '../FormInput/form-input';
// import { FormButton } from '../FormInput/form-button';
import s from './index.module.css';


function Form({ title, handleFormSubmit, children }) {
	// const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })

	const cbSubmit = (data) => {
		console.log(data)
	}


	return(

		<form className = {s.form} onSubmit = { handleFormSubmit} >
			<h1 className={s.title}>{title}</h1>

         {children}

			{/* <FormInput
			{...emailRegister}
			   id = "email"
				type="text"
				placeholder="email"
				
	      />
			<div>
				{errors?.name && <p className='errorMessage'> {errors?.name?.message}</p>}
			</div>

			{['login', 'registration'].includes(formType)&& 
			<>
			<FormInput
			{...passwordRegister}
				id = "password"
			   type="password"
				placeholder={input.password}

			/>
			<div>
				{errors?.name && <p className='errorMessage'> {errors?.name?.message}</p>}
			</div>
			</>
			}

			{
			formType === 'login' && 
			<p className={cn(s.infoText, s.link)} onClick = {()=> changeType('reset')}>{infoText}</p>
			}

			{['reset', 'registration'].includes(formType)&& 
			<p className="infoText">{infoText}</p>
			}
			
			<FormButton color = 'yellow' type = "submit">{button.submit}</FormButton>
			
			{['login', 'registration'].includes(formType)&& 
			<FormButton color = 'white' type = "button" onClick = {()=> changeType(redirect)}>{button.redirect}</FormButton>
			}  */}
</form >
	
	
)

}
export default Form;