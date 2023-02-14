import s from './index.module.css';
import { ReactComponent as FavoriteIcon } from './img/favorites.svg'
import { ReactComponent as LogoutIcon } from './img/logout.svg'
import { ReactComponent as CartIcon } from './img/cart.svg'
import { ReactComponent as ProfileIcon } from './img/profile.svg'
import { ReactComponent as UserIcon } from './img/user.svg'

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardContext } from "../../context/cardContext"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/userSlice';



function Header({ children }) {
  // const { favoriteCard } = useContext(CardContext);
  const user = useSelector(state => state.user.data)
  const favorites = useSelector(state => state.products.favoriteProducts)
  const location = useLocation();
  const dispatch = useDispatch();


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

            {!user && <Link replace to='/login' state={{ backgroundLocation: location, initialPath: location.pathname }} className={s.iconsMenuItem}>
              <UserIcon />
              Войти
            </Link>
            }
            {user && <Link to="/" className={s.iconsMenuItem} onClick={() => dispatch(logout())}>
              <LogoutIcon />
              Выйти
            </Link>
            }
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;
