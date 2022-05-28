import React from "react";
import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😆</span>
        Ничего не найдено!!!
      </h1>
      <p className={styles.description}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia quas
        hic aliquid labore, dolores delectus!
      </p>
    </div>
  );
}

export default NotFoundBlock;
