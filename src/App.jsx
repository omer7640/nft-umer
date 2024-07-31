import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./constants/routes";
import { counterContext } from "./context/context";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const router = createBrowserRouter(routes);
  const [projectItems, setProjectItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
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
  const deleteNft = (id) => {
    axios.delete(`http://localhost:5173/nfts/${id}`);
    const newNfts = projectItems.filter((projectItem) => {
      return projectItem.id !== id;
    });
    setProjectItems(newNfts);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <counterContext.Provider
        value={{ projectItems, setProjectItems, addProduct, deleteNft }}
      >
        <RouterProvider router={router} />
      </counterContext.Provider>
    </>
  );
}

export default App;
