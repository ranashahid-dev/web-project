import React from 'react';

const ProductCard = ({ item, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="card">
      <img src={item.img} alt={item.name} className="card-img" />
      <div className="card-body">
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <small style={{color: '#d35400', fontWeight: 'bold'}}>{item.category}</small>
          <span style={{fontWeight:'bold'}}>Rs. {item.price}</span>
        </div>
        <h3 style={{margin: '10px 0'}}>{item.name}</h3>
        <p style={{fontSize: '0.85rem', color: '#666', height: '40px'}}>{item.ingredients}</p>
        
        {isAdmin ? (
          <div style={{display:'flex', gap: '5px'}}>
            <button className="btn btn-edit" onClick={() => onEdit(item)}>Edit</button>
            <button className="btn btn-del" onClick={() => onDelete(item.id)}>Delete</button>
          </div>
        ) : (
          <button className="btn btn-buy" onClick={() => alert(`${item.name} added to cart!`)}>Order Now</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;