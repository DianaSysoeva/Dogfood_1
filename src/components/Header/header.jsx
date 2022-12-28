import s from './index.module.css';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg'
import { ReactComponent as LogoutIcon } from './img/logout.svg'
import { ReactComponent as CartIcon } from './img/cart.svg'
import { ReactComponent as ProfileIcon } from './img/profile.svg'
import { ReactComponent as UserIcon } from './img/user.svg'

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardContext } from "../../context/cardContext"


function Header({ children, user }) {
  const { favoriteCard } = useContext(CardContext);
  const location = useLocation();


  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={{ pathname: "/favorites" }} >
              <FavoriteIcon />
              {favoriteCard.length !== 0 && <span className={s.iconBubble}>{favoriteCard.length}</span>}
            </Link>

            <Link to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }} className={s.iconsMenuItem}>
              <UserIcon />
              Войти
            </Link>

          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;
