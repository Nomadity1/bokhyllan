// COMPONENT FOR HEADER
// IMPORT OF PACKAGES & DEPENDENCIES
// IMPORT OF COMPONENTS

// FUNCTIONS & PARAMETERS
// function Header({ authed }) {
function Header() {
  const Title = "Bokhyllan";
  // CONTENT TO BE RENDERED
  return (
    <header className="top-header-container row-flex">
      <div className="top-header-container-logo">
        <img
          src="../assets/bokhyllanLogo.jpg"
          alt="Logo för Bokhyllan"
          className="header-logo-icon"
        />
      </div>
      <div className="top-header-container-title">
        <h1 className="header-title">{Title}</h1>
      </div>
      <div className="top-header-container-icon-menu row-flex">
        <p> Inloggnings och varukorgsikoner på väg...</p>
      </div>
    </header>
  );
}
// EXPORTS
export default Header;
