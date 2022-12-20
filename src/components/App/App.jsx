import { useCallback, useEffect, useState } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Search from '../Search/search';
import Logo from '../Logo/logo';
import Sort from '../Sort/sort';
import './index.css';
import SearchInfo from '../SearchInfo/search-info';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import Spinner from '../Spinner';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page'
import { ProductPage } from '../../pages/ProductPage/product-page';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Form from '../Form/form';
import Modal from '../Modal/modal';
import { Register } from '../Register/register';
import { Login } from '../Login/login';
import { ResetPassword } from '../ResetPassword/reset-password';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 200);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;
  const navigate = useNavigate();

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id));
        setFavorites(prevState => favoriteProducts);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })

  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])


  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  const addContact = useCallback((formData) => {
    console.log(formData);
  }, [])

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        })
        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])


  return (

    <UserContext.Provider value={{ user: currentUser }}>
      <CardContext.Provider value={{ cards, favorites, handleLike: handleProductLike }}>

        <Header>
          <>
            <Logo className="logo logo_place_header" href="/" />
            <Routes >
              <Route path='/' element={
                <Search
                  onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              } />
            </Routes>
          </>
        </Header>
        <main className='content container'>
          <SearchInfo searchText={searchQuery} />
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location} >
            <Route index element={
              <CatalogPage
                isLoading={isLoading}
              />
            } />
            <Route path='/product/:productId' element={
              <ProductPage
                isLoading={isLoading}
              />
            } />
            <Route path='/favorites' element={
              <FavoritePage
                isLoading={isLoading}
              />
            } />

            <Route path='/login' element={

              <Login />
            } />
            <Route path='/register' element={
              <Register />
            } />
            <Route path='/reset-password' element={
              <ResetPassword />
            } />
            <Route path='*' element={<NotFoundPage />}
            />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route path='/login' element={

                <Modal>
                  <Login />
                </Modal>
              } />

              <Route path='/register' element={
                <Modal>
                  <Register />
                </Modal>

              } />
              <Route path='/reset-password' element={
                <Modal>
                  <ResetPassword />
                </Modal>

              } />
            </Routes>
          )}
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
