import React from 'react';

const Navbar = ({ onAdminClick, isAdmin, onLogout, setSearch }) => {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => window.location.reload()} style={{cursor:'pointer'}}>
         🥐 <b>Shahid Bakery</b>
      </div>
      <input 
        type="text" 
        placeholder="Search items..." 
        style={{padding: '10px 20px', borderRadius: '25px', border: '1px solid #ddd', width: '30%', outline: 'none'}}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {isAdmin ? (
          <button className="btn-edit" onClick={onLogout} style={{width:'auto'}}>Logout</button>
        ) : (
          <button className="btn-buy" onClick={onAdminClick} style={{width:'auto'}}>Admin Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;