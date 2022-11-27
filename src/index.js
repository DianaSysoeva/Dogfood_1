import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import { ProductPage } from './pages/ProductPage/product-page';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProductPage />);

