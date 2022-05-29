import React, { useState, useEffect } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

function Home() {
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categotyId, setCategotyId] = useState(0);
  const [currentPage, setCarrentPage] = useState(1);

  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categotyId > 0 ? `category=${categotyId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    fetch(
      `https://629026d227f4ba1c65b49bdc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((array) => {
        setItems(array);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [categotyId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCarrentPage(number)} />
    </div>
  );
}

export default Home;
