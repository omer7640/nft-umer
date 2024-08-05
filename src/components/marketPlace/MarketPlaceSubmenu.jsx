import { useState } from "react";
import {
  Cross,
  Diamond,
  Discount,
  Hand,
  Image,
  Search,
} from "../../assets/Icons";
import AddNft from "../AddNft";
import { Button } from "../shared/Button";
import { useContext } from "react";
import { counterContext } from "../../context/context";

export function MarketPlaceSubmenu() {
  // const [search, setSearch] = useState("");
  const value = useContext(counterContext);
  // console.log(query);
  return (
    <div className="py-6 flex md:gap-3 justify-between text-sm">
      <div className="flex bg-zinc-800 rounded-xl items-center p-3 gap-1 w-full">
        <Search />
        <input
          value={value.search}
          onChange={(e) => value.setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="bg-zinc-800"
        />
      </div>
      <div className="flex gap-3">
        <Button
          className="md:flex hidden gap-2.5 rounded-xl px-[50px]  bg-secondary-danger items-center"
          variant="ghost"
        >
          <Image />
          <span>NFT</span>
          <Cross />
        </Button>
        <Button
          className="md:flex hidden gap-2.5 rounded-xl px-[50px] bg-zinc-800 items-center min-w-max"
          variant="ghost"
        >
          <Discount />
          <span>Discount Codes</span>
        </Button>
        <Button
          className="xl:flex hidden gap-2.5 rounded-xl px-[50px] bg-zinc-800 items-center  min-w-max"
          variant="ghost"
        >
          <Hand />
          <span>Physical Items</span>
        </Button>
        <Button
          className="xl:flex hidden gap-2.5 rounded-xl px-[50px] bg-zinc-800 items-center  min-w-max"
          variant="ghost"
        >
          <Diamond />
          <span>Perks</span>
        </Button>
        {/* Add a nft */}

        <AddNft />
      </div>
    </div>
  );
}
