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
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <counterContext.Provider value={{ projectItems, setProjectItems }}>
        <RouterProvider router={router} />
      </counterContext.Provider>
    </>
  );
}

export default App;
