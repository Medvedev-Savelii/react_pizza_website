import React from "react";

type CategoriesProps = {
  value: number,
  onClickCategory: any,
};

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
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
};

export { Categories };
