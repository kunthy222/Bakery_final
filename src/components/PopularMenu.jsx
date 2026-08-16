import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const menus = [
  {
    id: "chocolate-doughnuts",
    name: "Chocolate Doughnuts",
    description:
      "Soft and fluffy doughnuts topped with rich chocolate.",
    price: 3.0,
    image:
      "https://i.pinimg.com/736x/6e/fc/a3/6efca37118d8c59dc83253877e21420a.jpg",
  },
  {
    id: "chocolate-croissant",
    name: "Chocolate Croissant",
    description:
      "Freshly baked croissant filled with rich chocolate.",
    price: 2.5,
    image:
      "https://i.pinimg.com/736x/53/69/a4/5369a452b2e9da56bf94011d67e42ed0.jpg",
  },
  {
    id: "chocolate-churros",
    name: "Chocolate Churros",
    description:
      "Crispy golden churros served with rich melted chocolate.",
    price: 7.5,
    image:
      "https://i.pinimg.com/1200x/77/2d/40/772d4075de65b3182339ba7c582bc3be.jpg",
  },
  {
    id: "blackberry-pie",
    name: "Blackberry Pie",
    description:
      "Warm, flaky pastry filled with plump, seasonal wild berries.",
    price: 5.0,
    image:
      "https://i.pinimg.com/1200x/65/da/56/65da5667249caa72922eae84351f3a5a.jpg",
  },
  {
    id: "opera-cake",
    name: "Opera Cake",
    description:
      "Traditional French layered cake with rich coffee and chocolate.",
    price: 8.5,
    image:
      "https://i.pinimg.com/736x/d1/ee/8d/d1ee8d0026b516254187dda792142670.jpg",
  },
  {
    id: "strawberry-cake",
    name: "Strawberry Cake",
    description:
      "Rich chocolate layers filled with fresh strawberries and cream.",
    price: 5.5,
    image:
      "https://i.pinimg.com/736x/9d/25/93/9d2593780fe22eba7acf1ea6e9e57110.jpg",
  },
];

export default function PopularMenu() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (menu) => {
    addToCart(menu, 1);
  };

  const handleOrder = (menu) => {
    addToCart(menu, 1);
    navigate("/cart");
  };

  return (
    <section className="menu-section" id="popular-menu">
      <div className="container">

        <h2 className="menu-title">
          Popular Menu
        </h2>

        <div className="row g-5">

          {menus.map((menu) => (
            <div
              className="col-lg-4 col-md-6"
              key={menu.id}
            >
              <div className="menu-card">

                <img
                  src={menu.image}
                  className="menu-img"
                  alt={menu.name}
                />

                <div className="p-3 d-flex justify-content-between align-items-center">

                  <div>
                    <h4 className="menu-name">
                      {menu.name}
                    </h4>

                    <p className="menu-desc">
                      {menu.description}
                    </p>
                  </div>

                  <div className="price-circle">
                    ${menu.price.toFixed(2)}
                  </div>

                </div>

                <div className="d-flex gap-2 px-3 pb-3">
                  <button
                    type="button"
                    className="order-btn flex-fill"
                    onClick={() => handleAddToCart(menu)}
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className="order-btn flex-fill"
                    onClick={() => handleOrder(menu)}
                  >
                    Order Now
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}