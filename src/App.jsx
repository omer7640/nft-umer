import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./constants/routes";
import { counterContext } from "./context/context";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const router = createBrowserRouter(routes);
  const [projectItems, setProjectItems] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [search, setSearch] = useState("");
  // const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5173/nfts").then((response) => {
      setProjectItems(response.data);
      setIsloading(false);
    });
  }, []);

  const addProduct = (newProduct) => {
    axios.post("http://localhost:5173/nfts", newProduct).then((response) => {
      setProjectItems((prevProducts) => [...prevProducts, response.data]).catch(
        (error) => console.error("Error adding product:", error)
      );
    });
  };
  const deleteNft = (userid) => {
    axios.delete(`http://localhost:5173/nfts/${userid}`);
    const newNfts = projectItems.filter((projectItem) => {
      return projectItem.id !== userid;
    });
    setProjectItems(newNfts);
  };
  const editProduct = (updatedProduct) => {
    // console.log(updatedProduct);
    axios
      .put(`http://localhost:5173/nfts/${updatedProduct.id}`, updatedProduct)
      .then((response) => {
        let updatedNft = projectItems?.map((item) => {
          if (item?.id === updatedProduct?.id) {
            return response?.data;
          } else {
            return item;
          }
        });
        setProjectItems(updatedNft);
      })
      .catch((error) => console.log(error));
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <counterContext.Provider
        value={{
          projectItems,
          setProjectItems,
          addProduct,
          deleteNft,
          editProduct,
          currentProduct,
          handleEditClick,
          setCurrentProduct,
          search,
          setSearch,
          // query,
          // setQuery,
        }}
      >
        <RouterProvider router={router} />
      </counterContext.Provider>
    </>
  );
}

export default App;
