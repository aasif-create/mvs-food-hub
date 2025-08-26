import React from "react";

export default function CookProfile({ cook, onBack, onDishSelect }) {
  return (
    <div className="homepage">
      <button className="ghost-button" onClick={onBack}>
        ← Back
      </button>
      <div className="profile-header" style={{ textAlign: "center", margin: "18px 0" }}>
        <img src={cook.profilePic} alt={cook.name} className="media-img" style={{ width:120, height:120, borderRadius:"50%" }}/>
        <h2>{cook.name}</h2>
        <p>⭐ {cook.review.toFixed(1)}</p>
      </div>
      <h3>Dishes by {cook.name}</h3>
      <div className="grid grid-dishes">
        {cook.dishes.map((dish, idx) => (
          <article key={idx} className="card dish-card"
            onClick={() => onDishSelect(dish)}>
            <div className="rect-media">
              <img src={dish.image} alt={dish.name} className="media-img" />
            </div>
            <h4>{dish.name}</h4>
            <p className="price">₹{dish.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
