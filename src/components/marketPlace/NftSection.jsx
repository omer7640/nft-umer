import author from "../../assets/author.png";
import NftCard from "./NftCard";
import { useContext } from "react";
import { counterContext } from "../../context/context";

export function NftSection() {
  const value = useContext(counterContext);
  console.log(value);
  return (
    <>
      {value.projectItems.length === 0 && (
        <div className="cart-empty">Sorry! You have No NFTs</div>
      )}
      <div className="grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8">
        {value.projectItems.map((nft) => (
          <NftCard nft={nft} />
        ))}
      </div>
    </>
  );
}
