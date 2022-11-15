import { useEffect, useState } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Search from '../Search/search';
import Logo from '../Logo/logo';
import Sort from '../Sort/sort';
import './index.css';
// import data from "../../assets/data.json"
import SearchInfo from '../SearchInfo/search-info';
import api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const debounceSearchQuery = useDebounce(searchQuery, 200);

  const handleRequest = () => { //меняем фильтрацию из массива на поиск с сервера
    // const filterCards = cards.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    // setCards(filterCards);
    api.search(debounceSearchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
      })
      .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    handleRequest()
    // console.log('INPUT', debounceSearchQuery);
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

  function handleProductLike(product) {
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked)
      .then((newCard) => {
        const newProducts = cards.map(cardState => {
          // console.log('Карточка из стейта', cardState)
          // console.log('Карточка с сервера ', cardState)
          return cardState._id === newCard._id ? newCard : cardState;
        })
        setCards(newProducts);
      })
  }
  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>

      <main className='content container'>
        <SearchInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className='contents__card'>
          <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
