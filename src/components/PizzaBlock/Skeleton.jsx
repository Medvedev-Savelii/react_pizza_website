import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="123" r="120" />
    <rect x="0" y="NaN" rx="0" ry="0" width="280" height="NaN" />
    <rect x="1" y="259" rx="15" ry="15" width="280" height="30" />
    <rect x="0" y="303" rx="15" ry="15" width="280" height="88" />
    <rect x="0" y="408" rx="15" ry="15" width="90" height="30" />
    <rect x="127" y="402" rx="15" ry="15" width="155" height="45" />
  </ContentLoader>
);

export default Skeleton;
