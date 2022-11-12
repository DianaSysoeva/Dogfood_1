import { useEffect, useState } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Search from '../Search/search';
import Logo from '../Logo/logo';
import Sort from '../Sort/sort';
import './index.css';
import data from "../../assets/data.json"
import SearchInfo from '../SearchInfo/search-info';


function App() {
  const [cards, setCards] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRequest = () => {
    const filterCards = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setCards(filterCards);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }

  useEffect(() => {
    handleRequest()
    console.log('INPUT', searchQuery);
  }, [searchQuery])


  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  return (
    <>
      <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <Header />
      <main className='content container'>
        <SearchInfo searchCount={cards.length} searchText={searchQuery} />
        <Sort />
        <div className='contents__card'>
          <CardList goods={cards} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
