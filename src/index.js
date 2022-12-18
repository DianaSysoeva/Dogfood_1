import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { ProductPage } from './pages/ProductPage/product-page';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';//заменила для отображения на gh-pages.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>

);

