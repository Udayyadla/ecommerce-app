import React, { useState } from "react";
import productCategory from "./productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../helpers/UploadImage";
import axios from "axios";

const UploadProduct = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImgToCloudinary = await UploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: uploadImgToCloudinary.url,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/uploadProduct",
        data
      );
      console.log("Form data submitted:", response.data);
    } catch (err) {
      console.log("Error submitting form data:", err);
    }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Upload Product</h2>
        </div>

        <form
          className="grid p-4 gap-2 h-full pb-5 overflow-y-scroll"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter a Product Name"
            value={data.productName}
            name="productName"
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
            required
          />
          <label htmlFor="brandName">Brand Name</label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter a Brand Name"
            value={data.brandName}
            name="brandName"
            className="p-2 bg-slate-100 border rounded"
            required
            onChange={handleOnChange}
          />
          <label htmlFor="category">Category</label>
          <select
            value={data.category}
            required
            name="category"
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
          >
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage ? (
              <img
                src={data.productImage}
                alt={data.productName}
                width={120}
                height={120}
                className="bg-slate-100 border"
              />
            ) : (
              <p className="text-red-600 text-xs">
                *Please upload product image
              </p>
            )}
          </div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter a Price"
            value={data.price}
            name="price"
            className="p-2 bg-slate-100 border rounded"
            required
            onChange={handleOnChange}
          />
          <label htmlFor="description" className="mt-3">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter a Product Description"
            value={data.description}
            name="description"
            className="h-28 bg-slate-100 border resize-none p-1"
            required
            onChange={handleOnChange}
          />
          <button
            className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
