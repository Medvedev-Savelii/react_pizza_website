import qs from "qs";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Categories } from "../components/Categories";
import { SortPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { sorts } from "../components/Sort";
import { useAppDispatch } from "../redux/store";
import { setCategoryId, setCurrentPage } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";


const Home:React.FC = () => {
	//@ts-ignore
  const categoryId = useSelector((state) => state.filter.categoryId);
    //@ts-ignore
  const sort = useSelector((state) => state.filter.sort.sortProperty);
    //@ts-ignore
  const searchValue = useSelector((state) => state.filter.searchValue);
	//@ts-ignore
  const currentPage = useSelector((state) => state.filter.currentPage);
	//@ts-ignore
  const { items, status } = useSelector((state) => state.pizza);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = (number:number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.includes("-") ? "asc" : "desc";
    const sortBy = sort.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
  };

  // Если изменили параметры и был первый рендер
//   useEffect(() => {
//     if (isMounted.current) {
//       const queryString = qs.stringify({
//         sortProperty: sort,
//         categoryId,
//         currentPage,
//       });
//       navigate(`/?${queryString}`);
//     }

// 	if(!window.location.search) {
// 		dispatch(fetchPizzas({} as SearchPizzaParams ))
// 	}
//     isMounted.current = true;
//   }, [categoryId, sort, searchValue, currentPage]);
  // Если БЫЛ первый рендер, то проверяем url-ПАРАМЕТРЫ и добовляем в REDUX
//   useEffect(() => {
//     if (window.location.search) {
//       const params: SearchPizzaParams = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
//       const sort = sorts.find(
//         (obj) => obj.sortProperty === params.sortBy
//       );
//       dispatch(
//         setFilters({
//           	searchValue: params.search,
// 			categoryId: Number(params.category),
// 			currentPage: Number(params.currentPage),
//          	sort:  sort || sorts[0],
//         })
//       );
//       isSearch.current = true;
//     }
//   }, []);
  // Если БЫЛ первый рендер,ТО ЗАПРАШИВАЕМ ПИЦЦЫ
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((obj:any) => (
      <PizzaBlock key={obj.id} {...obj} />
  ));
  const skeletons = [...new Array(6)].map((_, id) => <Skeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "Loading" ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
