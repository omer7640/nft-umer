import { useContext } from "react";
import React from "react";
import { counterContext } from "../../context/context";
import author from "../../assets/author.png";

export default function NftCard({ nft }) {
  const value = useContext(counterContext);
  return (
    <div
      key={value.projectItems.rank}
      className="card border border-secondary-border rounded-xl border-solid p-2"
    >
      <div>
        <img className="w-full max-h-[350px]" src={nft.image} alt="nft" />
      </div>
      <div className="pt-2 flex flex-col gap-1">
        <span className="text-sm text-[#A1A1AA]">{nft.title}</span>
        <h1>{nft.reference}</h1>
      </div>
      <div className="py-2 mt-3 flex justify-between rounded-xl px-3 bg-zinc-800 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#A1A1AA]">Author</span>
          <div className="text-sm xl:text-base flex gap-1">
            <img src={author} alt="author" />
            <p>{nft.author}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#A1A1AA]">Price</span>
          <div className="text-sm xl:text-base flex gap-1 items-center">
            <div className="flex gap-1">
              <p>{nft.price_eth}</p>
              <span>ETH</span>
            </div>
            <span className="text-[#A1A1AA] text-xs">${nft.price_usd}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
