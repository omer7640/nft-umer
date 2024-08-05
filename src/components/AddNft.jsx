import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { counterContext } from "../context/context";
import axios from "axios";

export default function AddNft({ edit }) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [price_usd, setPrice_usd] = useState("");
  const [price_eth, setPrice_eth] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const value = useContext(counterContext);
  // console.log(value.projectItems[0].title);
  // console.log(value.currentProduct);

  useEffect(() => {
    if (value.currentProduct && edit) {
      setTitle(value.currentProduct.title);
      setPrice_usd(value.currentProduct.price_usd);
      setPrice_eth(value.currentProduct.price_eth);
      setAuthor(value.currentProduct.author);
      setImage(value.currentProduct.image);
    }
  }, [value.currentProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      title,
      price_eth,
      price_usd,
      author,
      image,
      id: value.currentProduct?.id,
    };
    if (value.currentProduct && edit) {
      console.log("hey1===", value.currentProduct, product);
      value.editProduct(product);
    } else {
      // console.log("hey2===", product);
      // setTitle("");

      value.addProduct(product);
    }
    // value.addProduct(newProduct);

    setTitle("");
    setPrice_usd("");
    setPrice_eth("");
    setAuthor("");
    setImage("");
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  // useEffect(() => {
  //   console.log("hey", value);
  // }, [value]);

  const handleClose = () => {
    setTitle("");
    setPrice_usd("");
    setPrice_eth("");
    setAuthor("");
    setImage("");
    setModal(!modal);
  };

  // image function
  // useEffect(() => {}, []);
  const handleImage = (e) => {
    // console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  // const handleApi = () => {
  //   let formData = new formData();
  //   formData.append(`image`, image);
  //   axios
  //     .post(`http://localhost:5173/nfts`, formData)
  //     .then((response) => console.log(response));
  // };
  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={() => {
          toggleModal();
        }}
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {/* Add a Nft */}
        {edit ? "Edit" : "Add a Nft"}
      </button>

      {/* <!-- Main modal --> */}
      {modal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overlay overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edit ? "Edit a Nft" : "Create A new Nft"}
                </h3>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price_usd
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={price_usd}
                      onChange={(e) => setPrice_usd(e.target.value)}
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price_eth
                    </label>
                    <input
                      type="text"
                      value={price_eth}
                      onChange={(e) => setPrice_eth(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      id="description"
                      rows="2"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Author"
                      required="please fill"
                    ></input>
                    <input
                      type="file"
                      // value={image}
                      // onChange="readUrl(this)"
                      name="image"
                      onChange={handleImage}
                      accept="Image/*"
                      rows="2"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Image"
                      required="please fill"
                    ></input>
                    <img src={image} />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {value.currentProduct && edit ? "Update" : "Add a New Nft"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
