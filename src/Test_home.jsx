import React, { useState, useMemo } from "react";
import "./Testhome.css";
import CookProfile from "./CookProfile";
import DishOverview from "./DishOverview";

const COOKS = [
  {
    id: 1,
    name: "Chef Rahul",
    review: 4.6,
    profilePic: "/images/cook2.jpg",
    dishes: [
      { cookName: "Chef Rahul", name: "Chicken Biryani", image: "/images/dish2.jpg", review: 4.8, price: 300, description:"Fragrant rice and chicken, Hyderabadi style." },
      { cookName: "Chef Rahul", name: "Tandoori Chicken", image: "/images/dish8.jpg", review: 4.6, price: 320, description:"Spicy chicken grilled to perfection." }
    ]
  },
  {
    id: 2,
    name: "Chef Arjun",
    review: 4.7,
    profilePic: "/images/cook4.jpg",
    dishes: [
      { cookName: "Chef Arjun", name: "Mutton Rogan Josh", image: "/images/dish9.jpg", review: 4.8, price: 350, description:"Kashmiri-style lamb curry with rich spices." },
      { cookName: "Chef Arjun", name: "Butter Naan", image: "/images/dish10.jpg", review: 4.6, price: 60, description:"Soft and fluffy naan with butter glaze." }
    ]
  },
  {
    id: 3,
    name: "Chef Vikram",
    review: 4.5,
    profilePic: "/images/cook5.jpg",
    dishes: [
      { cookName: "Chef Vikram", name: "Fish Curry", image: "/images/dish11.jpg", review: 4.7, price: 280, description:"South Indian style tangy fish curry." },
      { cookName: "Chef Vikram", name: "Prawn Fry", image: "/images/dish12.jpg", review: 4.6, price: 320, description:"Crispy golden prawn fry with spices." }
    ]
  },
  {
    id: 4,
    name: "Chef Ramesh",
    review: 4.8,
    profilePic: "/images/cook6.jpg",
    dishes: [
      { cookName: "Chef Ramesh", name: "Dal Tadka", image: "/images/dish13.jpg", review: 4.8, price: 120, description:"Yellow lentils tempered with ghee & spices." },
      { cookName: "Chef Ramesh", name: "Aloo Paratha", image: "/images/dish14.jpg", review: 4.7, price: 90, description:"Stuffed potato paratha with butter." }
    ]
  },
  {
    id: 5,
    name: "Chef Karan",
    review: 4.9,
    profilePic: "/images/cook7.jpg",
    dishes: [
      { cookName: "Chef Karan", name: "Chole Bhature", image: "/images/dish15.jpg", review: 4.9, price: 160, description:"Punjabi chickpeas curry with fluffy bhature." },
      { cookName: "Chef Karan", name: "Rajma Chawal", image: "/images/dish16.jpg", review: 4.7, price: 140, description:"Red kidney beans curry served with rice." }
    ]
  },
  {
    id: 6,
    name: "Chef Sandeep",
    review: 4.6,
    profilePic: "/images/cook8.jpg",
    dishes: [
      { cookName: "Chef Sandeep", name: "Egg Curry", image: "/images/dish17.jpg", review: 4.6, price: 150, description:"Spiced boiled eggs in rich tomato gravy." },
      { cookName: "Chef Sandeep", name: "Chicken Curry", image: "/images/dish18.jpg", review: 4.7, price: 280, description:"Classic home-style chicken curry." }
    ]
  },
  {
    id: 7,
    name: "Chef Manish",
    review: 4.8,
    profilePic: "/images/cook9.jpg",
    dishes: [
      { cookName: "Chef Manish", name: "Keema Pav", image: "/images/dish19.jpg", review: 4.8, price: 200, description:"Spicy minced mutton served with pav." },
      { cookName: "Chef Manish", name: "Bhindi Fry", image: "/images/dish20.jpg", review: 4.6, price: 130, description:"Crispy fried okra with spices." }
    ]
  },
  {
    id: 8,
    name: "Chef Sameer",
    review: 4.7,
    profilePic: "/images/cook10.jpg",
    dishes: [
      { cookName: "Chef Sameer", name: "Kadhi Pakora", image: "/images/dish21.jpg", review: 4.7, price: 140, description:"Gram flour dumplings in yogurt-based curry." },
      { cookName: "Chef Sameer", name: "Baingan Bharta", image: "/images/dish22.jpg", review: 4.8, price: 160, description:"Smoky roasted eggplant curry." }
    ]
  },
  {
    id: 9,
    name: "Chef Mohan",
    review: 4.6,
    profilePic: "/images/cook11.jpg",
    dishes: [
      { cookName: "Chef Mohan", name: "Kebab Platter", image: "/images/dish23.jpg", review: 4.8, price: 400, description:"Assorted grilled kebabs." },
      { cookName: "Chef Mohan", name: "Mutton Korma", image: "/images/dish24.jpg", review: 4.7, price: 350, description:"Rich and creamy Mughlai mutton curry." }
    ]
  },
  {
    id: 10,
    name: "Chef Ajay",
    review: 4.5,
    profilePic: "/images/cook12.jpg",
    dishes: [
      { cookName: "Chef Ajay", name: "Veg Pulao", image: "/images/dish25.jpg", review: 4.6, price: 180, description:"Aromatic vegetable rice with spices." },
      { cookName: "Chef Ajay", name: "Chana Masala", image: "/images/dish26.jpg", review: 4.7, price: 160, description:"Chickpeas cooked in tomato-onion gravy." }
    ]
  },
  {
    id: 11,
    name: "Chef Naveen",
    review: 4.7,
    profilePic: "/images/cook13.jpg",
    dishes: [
      { cookName: "Chef Naveen", name: "Malai Kofta", image: "/images/dish27.jpg", review: 4.8, price: 240, description:"Fried cottage cheese dumplings in creamy gravy." },
      { cookName: "Chef Naveen", name: "Jeera Rice", image: "/images/dish28.jpg", review: 4.6, price: 120, description:"Basmati rice cooked with cumin seeds." }
    ]
  },
  {
    id: 12,
    name: "Chef Rohit",
    review: 4.8,
    profilePic: "/images/cook14.jpg",
    dishes: [
      { cookName: "Chef Rohit", name: "Shahi Paneer", image: "/images/dish29.jpg", review: 4.9, price: 260, description:"Paneer in royal cashew-based gravy." },
      { cookName: "Chef Rohit", name: "Veg Manchurian", image: "/images/dish30.jpg", review: 4.7, price: 220, description:"Fried veggie balls in tangy Indo-Chinese sauce." }
    ]
  },
  {
    id: 13,
    name: "Chef Harish",
    review: 4.6,
    profilePic: "/images/cook15.jpg",
    dishes: [
      { cookName: "Chef Harish", name: "Palak Paneer", image: "/images/dish31.jpg", review: 4.7, price: 230, description:"Paneer cooked in creamy spinach gravy." },
      { cookName: "Chef Harish", name: "Gulab Jamun", image: "/images/dish32.jpg", review: 4.9, price: 100, description:"Soft fried dough balls soaked in sugar syrup." }
    ]
  }
];

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
  const [view, setView] = useState("home"); // 'home', 'cook', 'dish'
  const [selectedCook, setSelectedCook] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  const [query, setQuery] = useState("");
  const [showAllCooks, setShowAllCooks] = useState(false);
  const [showAllToday, setShowAllToday] = useState(false);
  const [showAllBest, setShowAllBest] = useState(false);

  const filteredCooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COOKS;
    return COOKS.filter(c => c.name.toLowerCase().includes(q));
  }, [query]);

  const filteredDishes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DISHES;
    return DISHES.filter(d => 
      d.dishName.toLowerCase().includes(q) ||
      d.cook.toLowerCase().includes(q)
    );
  }, [query]);

  
  const cooksToShow = showAllCooks ? filteredCooks : filteredCooks.slice(0, 4);
  const todayToShow = showAllToday ? filteredDishes : filteredDishes.slice(0, 4);
  const bestToShow  = showAllBest  ? filteredDishes : filteredDishes.slice(0, 4);

  
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

  
  if (view === "cook" && selectedCook) {
    return <CookProfile cook={selectedCook} onBack={goHome} onDishSelect={showDishView} />;
  }
  if (view === "dish" && selectedDish) {
    return <DishOverview dish={selectedDish} onBack={goHome} />;
  }

  
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


