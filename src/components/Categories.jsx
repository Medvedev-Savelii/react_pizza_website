import React from "react";

function Categories({ value, onClickCategory }) {
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
}

export { Categories };
