import React, { useState, useEffect } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categotyId, setCategotyId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://629026d227f4ba1c65b49bdc.mockapi.io/items?${
        categotyId > 0 ? `category=${categotyId}` : ""
      }&sortBy=${sortType.sortProperty}&order=desc`
    )
      .then((res) => res.json())
      .then((array) => {
        setItems(array);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [categotyId, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categotyId}
          onClickCategory={(id) => setCategotyId(id)}
        />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, id) => <Skeleton key={id} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
