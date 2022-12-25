import s from './index.module.css';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg'
import { ReactComponent as LogoutIcon } from './img/logout.svg'
import { ReactComponent as CartIcon } from './img/cart.svg'
import { ReactComponent as ProfileIcon } from './img/profile.svg'
import { ReactComponent as UserIcon } from './img/user.svg'

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardContext } from "../../context/cardContext"
import {useSelector } from 'react-redux'

function Header({ children }) {
  // const { favorites } = useContext(CardContext);
  const favorites = useSelector(state=> state.products.favoriteProducts)
  const location = useLocation();
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{ pathname: "/favorites" }} >
              <FavoriteIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>

            <Link className={s.favoritesLink} to={{ pathname: "/cart" }} >
              <CartIcon />
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>

            <Link to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }} className={s.iconsMenuItem}>
              <UserIcon />
             Войти
            </Link>

            <Link to='/profile' className={s.iconsMenuItem} >
              <ProfileIcon />
             Диана
            </Link>
        
          
            <Link to='/' className={s.iconsMenuItem} >
              <LogoutIcon />
             Выйти
            </Link>
          
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;
