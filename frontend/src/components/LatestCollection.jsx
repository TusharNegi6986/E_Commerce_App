import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { products } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection featuring fresh styles and trending
          products carefully selected just for you. Each item in this collection
          reflects modern design, quality craftsmanship, and great value.
          Whether you're looking to upgrade your wardrobe or find something
          unique, our newest arrivals are here to keep your style updated and
          exciting. Explore the collection and find your next favorite piece
          today.
        </p>
      </div>

      {/* rendering products*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
