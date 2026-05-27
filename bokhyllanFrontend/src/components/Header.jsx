// HEADER COMPONENT - used in App.jsx, rendered on all pages
// IMPORT ASSETS & COMPONENTS
import logo from "../assets/bokhyllanLogo.jpg";
import loginIcon from "../assets/icons/circle-user-solid-full.svg";
import bagIcon from "../assets/icons/bag-shopping-solid-full.svg";

// FUNCTIONS & PARAMETERS
// function Header({ authed }) {
function Header() {
  const Title = "Bokhyllan";
  // CONTENT TO BE RENDERED
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src={logo} alt="Logo för Bokhyllan" className="header-logo-icon" />
      </div>
      <div className="header-title-container">
        <h1 className="header-title">{Title}</h1>
      </div>
      <div className="header-menu-icon-container">
        <img src={loginIcon} alt="Login icon" className="header-menu-icon" />
        <img src={bagIcon} alt="Shopping bag icon" className="header-menu-icon" />
      </div>
    </header>
  );
}
// EXPORTS
export default Header;
