import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          "https://629026d227f4ba1c65b49bdc.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        error("Error fetch data pizzas");
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return (
      <div>
        <h1>Loading...</h1>;
      </div>
    );
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
