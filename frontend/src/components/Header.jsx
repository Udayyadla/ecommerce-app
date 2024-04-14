import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearch ,cartCount}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <header className="h-16 flex items-center justify-between px-2 md:px-4 fixed w-full z-50 bg-white shadow-lg">
      <div className="flex h-full items-center w-full justify-center max-w-3xl gap-2 max-h-9 border pl-4 rounded-full focus-within:shadow focus-within:shadow-slate-400/40 overflow-hidden">
        <input
          type="text"
          placeholder="Search products here"
          className="min-w-max w-full border-none outline-none placeholder:text-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="text-lg h-8 min-w-[50px] flex items-center justify-center cursor-pointer">
          <CiSearch onClick={handleSearch} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-3xl cursor-pointer">
          <Link to={'/upload'}><FaRegCircleUser /></Link>
        </div>
        <div className="text-2xl relative">
          <span>
            <Link to="/cart"><FaShoppingCart /></Link>
          </span>
          <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center -top-1 -right-1 justify-center">
            <p className="absolute text-xs">{cartCount}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
