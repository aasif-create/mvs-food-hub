import React from "react";

export default function DishOverview({ dish, onBack }) {
  return (
    <div className="homepage" style={{ maxWidth: 600, margin: "0 auto", padding: "16px" }}>
      <button className="ghost-button" onClick={onBack} style={{ marginBottom: 20 }}>
        ← Back
      </button>
      
      <div style={{ textAlign: "center" }}>
        <img
          src={dish.image}
          alt={dish.name}
          style={{
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: 16,
            marginBottom: 20,
          }}
          className="media-img"
        />
      </div>
      
      <section style={{ marginBottom: 20 }}>
        <h2 style={{ margin: "0 0 8px" }}>{dish.name}</h2>
        <p style={{ fontStyle: "italic", color: "#555", marginBottom: 12 }}>
          
          {dish.description ||
            `Enjoy this delicious dish made with fresh ingredients, prepared by ${dish.cookName}.`}
        </p>
      </section>
      
      <section style={{ marginBottom: 20 }}>
        <p style={{ fontWeight: "bold", fontSize: 20, margin: "0 0 4px" }}>
          Price: ₹{dish.price}
        </p>
        <p style={{ margin: 0, color: "#888" }}>Cook by {dish.cookName}</p>
      </section>
      
      <section style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <button className="search-action" type="button" style={{ flex: 1 }}>
          Add to Cart
        </button>
        <button className="search-action" type="button" style={{ flex: 1 }}>
          Buy Now
        </button>
      </section>
    </div>
  );
}

