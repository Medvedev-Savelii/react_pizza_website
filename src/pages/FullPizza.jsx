import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();

  React.useEffect(() => {
    axios.get("https://629026d227f4ba1c65b49bdc.mockapi.io/items" + id);
  }, []);

  return (
    <div>
      <img src="" alt="" />
      <h2>{id}</h2>
      <p></p>
      <h4></h4>
    </div>
  );
};

export default FullPizza;
