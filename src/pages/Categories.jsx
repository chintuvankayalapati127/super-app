import { useState } from "react";
import './Categories.css';
import { useNavigate } from "react-router-dom";

function Categories() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Music",
    "Sports",
    "Thriller",
    "Fantasy",
    "Romance",
  ];
     const handleCategory = (item) => {
        if (selected.includes(item)) {
        setSelected(
         selected.filter((category) => category !== item)
        );
       } else {
           setSelected([...selected, item]);
       }
      };
           const handleContinue = () => {
         if (selected.length < 3) {
          alert("Please select at least 3 categories");
            return;
        }

         localStorage.setItem(
         "categories",
         JSON.stringify(selected)
         );

        navigate("/dashboard");
        };


  return (
  <div className="container">
    <h1>🎭 Select Categories</h1>

    <div className="category-container">
      {categories.map((item) => (
           <div className={
            selected.includes(item)
            ? "category-card active"
            : "category-card"
         }
            key={item}
         onClick={() => handleCategory(item)}
         >
               {item}
         </div>
         ))}
    </div>

          <p>Selected Categories: {selected.length}</p>
          <button
              className="continue-btn"
               onClick={handleContinue}
           >
           Continue
         </button>

  </div>

);
}

export default Categories;