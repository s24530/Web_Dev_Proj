import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    price: "",
    quantity: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:4000/products/upload", {
      method: "POST",
      headers: {
        Accept: "appliction/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(JSON.stringify(product));
      await fetch("http://localhost:4000/products/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-item-field">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          required
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-field">
          <p>Price</p>
          <input
            value={productDetails.price}
            onChange={changeHandler}
            type="number"
            name="price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-item-field">
        <p>Quantity</p>
        <input
          value={productDetails.quantity}
          onChange={changeHandler}
          type="number"
          name="quantity"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-item-field">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-item-field">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-image"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          addProduct();
        }}
        className="addproduct-button"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
