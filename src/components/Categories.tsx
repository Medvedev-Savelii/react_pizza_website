import React from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: number,
  onClickCategory: (i:number) => void,
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
	useWhyDidYouUpdate("Categories", { value, onClickCategory });
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categotyName, id) => (
          <li
            key={id}
            onClick={() => onClickCategory(id)}
            className={value === id ? "active" : ""}
          >
            {categotyName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export { Categories };
