import React, { useEffect, useState } from "react";
import "./ListProducts.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProducts = () => {
  const [allProducts, setallProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/products/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setallProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const changeQuantity = async (id) => {
    await fetch(`http://localhost:4000/products/productquantity/${id}`, {
      method: "PUT",
    }).then((res) => {
      if (!res.ok) {
        const err = res.text();
        throw new Error(err || "Failed");
      }
    });
    await fetchInfo();
  };

  const removeProduct = async (id) => {
    await fetch(`http://localhost:4000/products/removeproduct/${id}`, {
      method: "DELETE",
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, i) => {
          return (
            <>
              <div
                key={i}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>{product.price} PLN</p>
                <p>{product.category}</p>
                <p>{product.quantity}</p>
                <img
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProducts;
