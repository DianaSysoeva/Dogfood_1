import s from './index.module.css';

function Header({ children}) {
  return (
    <header className= {s.header}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
