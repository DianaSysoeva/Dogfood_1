import s from './index.module.css';
import { ReactComponent as FavoriteIcon } from './favorites.svg'
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardContext } from "../../context/cardContext"

function Header({ children }) {
  const { favorites } = useContext(CardContext);
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
            <Link to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }}>Войти</Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;
