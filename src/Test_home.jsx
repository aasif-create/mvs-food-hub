import React, { useState, useMemo } from "react";
import "./Testhome.css";
import CookProfile from "./CookProfile";
import DishOverview from "./DishOverview";

/* === NEW COOK JSON STRUCTURE === */
const COOKS = [
  {
    id: 1,
    name: "Chef Ananya",
    review: 4.8,
    profilePic: "/images/cook1.jpg",
    dishes: [
      { cookName: "Chef Ananya", name: "Paneer Butter Masala", image: "/images/dish1.jpg", review: 4.9, price: 250, description:"Rich creamy paneer in tomato gravy." },
      { cookName: "Chef Ananya", name: "Masala Dosa", image: "/images/dish3.jpg", review: 4.7, price: 150, description:"Crispy dosa filled with spiced potatoes." }
    ]
  },
  {
    id: 2,
    name: "Chef Rahul",
    review: 4.6,
    profilePic: "/images/cook2.jpg",
    dishes: [
      { cookName: "Chef Rahul", name: "Chicken Biryani", image: "/images/dish2.jpg", review: 4.8, price: 300, description:"Fragrant rice and chicken, Hyderabadi style." },
      { cookName: "Chef Rahul", name: "Tandoori Chicken", image: "/images/dish8.jpg", review: 4.6, price: 320, description:"Spicy chicken grilled to perfection." }
    ]
  },
  {
    id: 3,
    name: "Chef Meera",
    review: 4.9,
    profilePic: "/images/cook3.jpg",
    dishes: [
      { cookName: "Chef Meera", name: "Veg Thali", image: "/images/dish5.jpg", review: 4.8, price: 180, description:"A complete vegetarian meal platter." },
      { cookName: "Chef Meera", name: "Paneer Tikka", image: "/images/dish6.jpg", review: 4.7, price: 220, description:"Grilled paneer with spicy marinade." }
    ]
  }
];

/* === Derived Dishes from COOKS === */
const DISHES = COOKS.flatMap(cook =>
  cook.dishes.map(dish => ({
    dishName: dish.name,
    price: dish.price,
    cook: cook.name,
    review: dish.review,
    image: dish.image,
    cookName: dish.cookName,
    description: dish.description
  }))
);

export default function HomePage() {
  // Navigation/view state
  const [view, setView] = useState("home"); // 'home', 'cook', 'dish'
  const [selectedCook, setSelectedCook] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  // App state
  const [query, setQuery] = useState("");
  const [showAllCooks, setShowAllCooks] = useState(false);
  const [showAllToday, setShowAllToday] = useState(false);
  const [showAllBest, setShowAllBest] = useState(false);

  /* Filtering cooks */
  const filteredCooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COOKS;
    return COOKS.filter(c => c.name.toLowerCase().includes(q));
  }, [query]);

  /* Filtering dishes */
  const filteredDishes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DISHES;
    return DISHES.filter(d => 
      d.dishName.toLowerCase().includes(q) ||
      d.cook.toLowerCase().includes(q)
    );
  }, [query]);

  /* Visible subsets */
  const cooksToShow = showAllCooks ? filteredCooks : filteredCooks.slice(0, 4);
  const todayToShow = showAllToday ? filteredDishes : filteredDishes.slice(0, 4);
  const bestToShow  = showAllBest  ? filteredDishes : filteredDishes.slice(0, 4);

  // Navigation handlers
  const showCookView = (cook) => {
    setSelectedCook(cook);
    setView("cook");
  };
  const showDishView = (dish) => {
    setSelectedDish(dish);
    setView("dish");
  };
  const goHome = () => {
    setView("home");
    setSelectedCook(null);
    setSelectedDish(null);
  };

  // Routing to second screen
  if (view === "cook" && selectedCook) {
    return <CookProfile cook={selectedCook} onBack={goHome} onDishSelect={showDishView} />;
  }
  if (view === "dish" && selectedDish) {
    return <DishOverview dish={selectedDish} onBack={goHome} />;
  }

  // Main screen
  return (
    <div className="homepage">
      <header className="header">
        <h1 className="brand">HomeKitchen</h1>
        <button className="profile-btn" aria-label="Open profile">
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="avatar"
            loading="lazy"
          />
        </button>
      </header>
      <div className="search-row" role="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search for dishes or cooks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-action" type="button">Search</button>
      </div>
      {/* Famous Cooks */}
      <section className="section">
        <div className="section-head">
          <h2>Famous Cooks</h2>
          <button className="ghost-button" onClick={() => setShowAllCooks(s => !s)}>
            {showAllCooks ? "Show Less" : "See All"}
          </button>
        </div>
        {filteredCooks.length === 0 ? (
          <p className="muted">No cooks match “{query}”.</p>
        ) : (
          <div className="grid grid-cooks">
            {cooksToShow.map((cook) => (
              <article key={cook.id} className="card cook-card fade-in"
                onClick={() => showCookView(cook)}>
                <div className="circle-media">
                  <img src={cook.profilePic} alt={cook.name} className="media-img" loading="lazy" />
                </div>
                <h3 className="card-title">{cook.name}</h3>
                <p className="subtle">⭐ {cook.review.toFixed(1)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      {/* Today's Menu */}
      <section className="section">
        <div className="section-head">
          <h2>Today’s Menu</h2>
          <button className="ghost-button" onClick={() => setShowAllToday(s => !s)}>
            {showAllToday ? "Show Less" : "See All"}
          </button>
        </div>
        {filteredDishes.length === 0 ? (
          <p className="muted">No dishes match “{query}”.</p>
        ) : (
          <div className="grid grid-dishes">
            {todayToShow.map((dish, idx) => (
              <article key={idx} className="card dish-card fade-in"
               onClick={() => showDishView(dish)}>
                <div className="rect-media">
                  <img src={dish.image} alt={dish.dishName} className="media-img" loading="lazy" />
                </div>
                <h3 className="card-title">{dish.dishName}</h3>
                <p className="price">₹{dish.price}</p>
                <p className="subtle">👨‍🍳 {dish.cook} | ⭐ {dish.review.toFixed(1)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      {/* Best Selling */}
      <section className="section">
        <div className="section-head">
          <h2>Best Selling Dishes</h2>
          <button className="ghost-button" onClick={() => setShowAllBest(s => !s)}>
            {showAllBest ? "Show Less" : "See All"}
          </button>
        </div>
        {filteredDishes.length === 0 ? (
          <p className="muted">No dishes match “{query}”.</p>
        ) : (
          <div className="grid grid-dishes">
            {bestToShow.map((dish, idx) => (
              <article key={idx} className="card dish-card fade-in"
               onClick={() => showDishView(dish)}>
                <div className="rect-media">
                  <img src={dish.image} alt={dish.dishName} className="media-img" loading="lazy" />
                </div>
                <h3 className="card-title">{dish.dishName}</h3>
                <p className="price">₹{dish.price}</p>
                <p className="subtle">👨‍🍳 {dish.cook} | ⭐ {dish.review.toFixed(1)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
