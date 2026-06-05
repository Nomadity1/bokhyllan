// IMPORT PACKAGES & DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// IMPORT PUBLIC PAGES
import Home from "./pages/Home";
import BookTip from "./pages/publicPages/BookTip";
import Contact from "./pages/publicPages/Contact";
import About from "./pages/publicPages/About";
import BookDetails from "./pages/publicPages/BookDetails";
import Register from "./pages/publicPages/Registration";
import Login from "./pages/publicPages/Login";
import NotFound from "./pages/publicPages/NotFound";
import Conditions from "./pages/publicPages/Conditions";
import Integrity from "./pages/publicPages/Integrity";
// IMPORT PURCHASE PAGES
import Cart from "./pages/purchasePages/Cart";
import Checkout from "./pages/purchasePages/Checkout";
import CheckoutResponse from "./pages/purchasePages/CheckoutResponse";
// IMPORT PROTECTED PAGES
import Profile from "./pages/protectedPages/Profile";
// IMPORT COMPONENTS
import Header from "./components/home/Header";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import Favourites from "./components/profile/Favourites";
// IMPORT AUTH-COMPONENT (används här för att skydda routes)
import { RequireAuth } from "./auth/RequireAuth";
// IMPORT STYLE
import "./App.css";

// FUNCTION
function App() {
  // Check if mobile menu is open (for toggling the mobile navigation)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// Function to toggle the mobile menu open/closed
  function toggleMobileMenu() {
    setMobileMenuOpen((previous) => !previous);
  }
// Function to close the mobile menu (used when navigating to a new page)
  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  // CONTENT TO BE RENDERED
  return (
    <Router>
      <div className="app-container">
        {/* HEADER */}
        <Header
          onMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={mobileMenuOpen}
        />
        {/* NAVIGATION */}
        <Navbar
          isMobileMenuOpen={mobileMenuOpen}
          onNavigate={closeMobileMenu}
        />
        {/* MAIN */}
        <main className="main-container">
          {/* ROUTES  */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<BookTip />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/books/:isbn" element={<BookDetails />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/integrity" element={<Integrity />} />
            {/* Purchase flow routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-response" element={<CheckoutResponse />} />
            {/* Registration & Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected route using RequireAuth wrapper component */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/favourites"
              element={
                <RequireAuth>
                  <Favourites />
                </RequireAuth>
              }
            />
            {/* End Fall-back route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* FOOTER */}
        <Footer />
      </div>
      {/* End of app-container */}
    </Router>
  );
}
// EXPORTS
export default App;
