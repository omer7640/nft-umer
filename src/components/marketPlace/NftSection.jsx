import author from "../../assets/author.png";
import NftCard from "./NftCard";
import { useContext, useState, useEffect } from "react";
import { counterContext } from "../../context/context";

export function NftSection() {
  const value = useContext(counterContext);

  const [filteredArr, setFilteredArr] = useState(
    value.projectItems ? value.projectItems : []
  );

  useEffect(() => {
    setFilteredArr(value.projectItems);
  }, [value.projectItems]);

  const handleFilter = (search) => {
    const filtered = value.projectItems.filter((nft) => {
      return search.toLowerCase() === ""
        ? nft
        : nft.title.toLowerCase().includes(search);
    });
    setFilteredArr(filtered);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleFilter(value.search);
    }, 1000);

    // handleFilter(value.search);
    return () => {
      clearTimeout(timeOut);
    };
  }, [value.search]);
  // console.log(filteredArr);

  return (
    <>
      {value.projectItems.length === 0 && (
        <div className="cart-empty">Sorry! You have No NFTs</div>
      )}
      <div className="grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8">
        {filteredArr.map((nft) => (
          <NftCard nft={nft} key={nft.id} />
        ))}
      </div>
    </>
  );
}
