import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';

const INITIAL_DATA = [
  // --- CAKES (5 Items) ---
  { id: 1, name: "Belgian Chocolate Fudge", price: 2800, category: "Cakes", ingredients: "Dark Chocolate, Cocoa, Fresh Cream", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" },
  { id: 2, name: "Red Velvet Romance", price: 2400, category: "Cakes", ingredients: "Cream Cheese, Vanilla, Cocoa Sponge", img: "https://images.unsplash.com/photo-1616031037011-087000171abe?w=500" },
  { id: 3, name: "Blueberry Cheesecake", price: 3200, category: "Cakes", ingredients: "Graham Cracker, Cream Cheese, Berries", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500" },
  { id: 4, name: "Vanilla Bean Cloud", price: 1800, category: "Cakes", ingredients: "Madagascar Vanilla, Buttercream", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500" },
  { id: 5, name: "Lotus Biscoff Cake", price: 3500, category: "Cakes", ingredients: "Biscoff Spread, Caramel, Speculoos", img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=500" },

  // --- PASTRIES (4 Items) ---
  { id: 6, name: "Strawberry Tart", price: 280, category: "Pastries", ingredients: "Shortcrust Pastry, Glazed Berries", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500" },
  { id: 7, name: "French Butter Croissant", price: 350, category: "Pastries", ingredients: "Laminated Dough, High Quality Butter", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500" },
  { id: 8, name: "Chocolate Éclair", price: 320, category: "Pastries", ingredients: "Choux Pastry, Chocolate Ganache", img: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=500" },
  { id: 9, name: "Almond Danishes", price: 400, category: "Pastries", ingredients: "Toasted Almonds, Sweet Custard", img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500" },

  // --- DONUTS (4 Items) ---
  { id: 10, name: "Classic Glazed Donut", price: 150, category: "Donuts", ingredients: "Yeasted Dough, Sugar Glaze", img: "https://images.unsplash.com/photo-1527677202312-6c4045b4e262?w=500" },
  { id: 11, name: "Boston Cream Donut", price: 220, category: "Donuts", ingredients: "Pastry Cream Fill, Chocolate Top", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500" },
  { id: 12, name: "Sprinkle Happiness", price: 180, category: "Donuts", ingredients: "Strawberry Frosting, Rainbow Sprinkles", img: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=500" },
  { id: 13, name: "Nutella Filled Bomb", price: 250, category: "Donuts", ingredients: "Hazelnut Spread, Powdered Sugar", img: "https://images.unsplash.com/photo-1533910534207-90f31029a78e?w=500" },

  // --- COOKIES (4 Items) ---
  { id: 14, name: "Soft Choco Chip", price: 120, category: "Cookies", ingredients: "Belgian Chocolate, Brown Sugar", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500" },
  { id: 15, name: "Double Dark Cookie", price: 150, category: "Cookies", ingredients: "Dark Cocoa, White Chocolate Chips", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500" },
  { id: 16, name: "Oatmeal Raisin", price: 130, category: "Cookies", ingredients: "Organic Oats, Sun-dried Raisins", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=500" },
  { id: 17, name: "Pistachio Biscotti", price: 800, category: "Cookies", ingredients: "Roasted Pistachios, Twice Baked", img: "https://images.unsplash.com/photo-1557089706-68d02dbda277?w=500" },

  // --- BREAD (3 Items) ---
  { id: 18, name: "Artisan Sourdough", price: 600, category: "Bread", ingredients: "Wild Yeast, 24-hr Fermentation", img: "https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=500" },
  { id: 19, name: "Multigrain Loaf", price: 450, category: "Bread", ingredients: "Flax Seeds, Oats, Honey", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500" },
  { id: 20, name: "Garlic Mozzarella Baguette", price: 550, category: "Bread", ingredients: "Fresh Garlic, Italian Herbs", img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=500" }
];

function App() {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // Filtering State
  const [editMode, setEditMode] = useState(null);
  
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const [form, setForm] = useState({ name: "", price: "", category: "Cakes", ingredients: "", img: "" });

  const categories = ["All", "Cakes", "Pastries", "Cookies", "Bread", "Donuts"];

  useEffect(() => {
    const saved = localStorage.getItem('shahid_bakery_v6');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setItems(parsed);
        else setItems(INITIAL_DATA);
      } catch { setItems(INITIAL_DATA); }
    } else { setItems(INITIAL_DATA); }
  }, []);

  useEffect(() => {
    localStorage.setItem('shahid_bakery_v6', JSON.stringify(items));
  }, [items]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.user === "admin" && credentials.pass === "shahid") {
      setIsAdmin(true);
      setShowLogin(false);
    } else { alert("Invalid Credentials!"); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setItems(items.map(i => i.id === editMode ? { ...form, id: editMode } : i));
      setEditMode(null);
    } else {
      setItems([{ ...form, id: Date.now() }, ...items]);
    }
    setForm({ name: "", price: "", category: "Cakes", ingredients: "", img: "" });
  };

  // Logic to Filter Items
  const filteredItems = items.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || i.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (showLogin) {
    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'100px'}}>
        <div className="card" style={{padding:'30px', width:'300px'}}>
          <h2 style={{textAlign:'center'}}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input style={{width:'90%', padding:'10px', margin:'10px 0'}} type="text" placeholder="User" onChange={e => setCredentials({...credentials, user: e.target.value})} />
            <input style={{width:'90%', padding:'10px', margin:'10px 0'}} type="password" placeholder="Pass" onChange={e => setCredentials({...credentials, pass: e.target.value})} />
            <button className="btn btn-submit" type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar isAdmin={isAdmin} onAdminClick={() => setShowLogin(true)} onLogout={() => setIsAdmin(false)} setSearch={setSearch} />
      
      {/* Category Filter Buttons */}
      <div className="filter-container">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {isAdmin && (
        <div className="admin-box">
          <h3>{editMode ? "Update Item" : "Add New Product"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option>Cakes</option><option>Pastries</option><option>Cookies</option><option>Bread</option><option>Donuts</option>
              </select>
            </div>
            <div className="form-row">
              <input style={{flex: 2}} placeholder="Ingredients" value={form.ingredients} onChange={e => setForm({...form, ingredients: e.target.value})} />
              <input style={{flex: 2}} placeholder="Image URL" value={form.img} onChange={e => setForm({...form, img: e.target.value})} />
            </div>
            <button type="submit" className="btn-submit btn">
              {editMode ? "Update Product" : "Publish Item"}
            </button>
          </form>
        </div>
      )}

      <div className="product-grid">
        {filteredItems.map(item => (
          <ProductCard 
            key={item.id} 
            item={item} 
            isAdmin={isAdmin} 
            onEdit={(item) => {setEditMode(item.id); setForm(item); window.scrollTo(0,0);}}
            onDelete={(id) => setItems(items.filter(i => i.id !== id))} 
          />
        ))}
      </div>

      <footer style={{textAlign:'center', padding:'30px', color:'#888'}}>
        © 2026 Shahid Bakery | Sahiwal Branch
      </footer>
    </div>
  );
}

export default App;