import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar flex-row justify-between align-center">
      <div className="nav-title">TicketTrac</div>
      <div className="nav-params flex-row align-center">
        <div className="nav-user">#boualouache lamia</div>
        <button>déconnexion</button>
      </div>
    </div>
  );
};

export default Navbar;
