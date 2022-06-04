const NavbarToggler = ({ navbarOpen }: { navbarOpen?: boolean }) => {
  return (
    <div className={`nav-icon ${navbarOpen ? "open" : ""}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default NavbarToggler;
