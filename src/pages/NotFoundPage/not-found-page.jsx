import { Banner } from "../../components/Banner/banner"
import { NotFound } from "../../components/NotFound/not-found"

export const NotFoundPage = () => {
	return (
		<>
		<NotFound title="Извините, страница не найдена" buttonText="На главную" />
		<Banner extraClass = "banner_big"/>
		<Banner extraClass = "banner_middle"/>
		</>
	)
}