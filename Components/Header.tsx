"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import useBoardStore from "@/store/BoardStore";
import { useEffect, useState } from "react";
import fetchSuggestions from "@/lib/fetchSuggestions";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setloading] = useState<boolean>(false);
  const [suggestion, setsuggestion] = useState<string>("");

  // useEffect(() => {
  //   if (board.columns.size === 0) return;
  //   setloading(true);

  //   const fetchSuggestionFunc = async () => {
  //     const suggestion = await fetchSuggestions(board);
  //     setloading(false);
  //     setsuggestion(suggestion);
  //   };

  //   fetchSuggestionFunc();
  // }, [board]);

  return (
    <header>
      <div className="flex flex-col space-y-3 md:flex-row items-center p-5 bg-gray-500/10 rounded-b-xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md  filter blur-3xl opacity-50 -z-50" />
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello logo"
          width="300"
          height="100"
          className="w-44 md:w-56 md:pb-0 object-contain cursor-pointer"
        />
        <div className="flex items-center space-x-5 flex-1  justify-end w-full">
          {/* search box */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 " />
            <input
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              placeholder="search"
              className="focus:outline-none flex-1 outline-none p-2 "
            />
            <button className="hidden">Search</button>
          </form>
          {/* Avatar */}
          <Avatar name="Sayan Mondal" round color="#0055D1" size="50" />
        </div>
      </div>
      <div className="flex justify-center px-5 md:py-5">
        <p className="flex bg-white items-center italic max-w-3xl py-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit ">
          <UserCircleIcon
            className={`h-6  text-[#0055D1] inline-block w-10 mr-1
            ${loading && "animate-spin"}
          `}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your tasks for today..."}
        </p>
      </div>
    </header>
  );
}

export default Header;
