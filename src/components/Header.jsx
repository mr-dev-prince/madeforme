import React, { useState } from "react";
import v1 from "../assets/logoweb.png";
import { FaHeart, FaRegUser, FaSearch, FaShoppingBag } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { RiMenu3Fill } from "react-icons/ri";
import { useContext } from "react";
import { currentUserContext } from "../context/userContext/CurrentUserProvider";
import { productContext } from "../context/productsContext/ProductContext";

const Header = () => {
  const [modal, setModal] = useState(true);
  const { setSearchQuery } =
    useContext(productContext);

  let { currUser } = useContext(currentUserContext);
  console.log(currUser);

  const search = async (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value)
    }
  };

  return (
    <div className="dark fixed w-full z-10">
      <div className=" bg-white w-full h-fit md:px-10 p-4 flex justify-between items-center">
        <HashLink to="/">
          <img className="h-12" src={v1} alt="" />
        </HashLink>
        <input
          type="text"
          placeholder="Search Product"
          onKeyUp={(e) => {
            search(e);
          }}
          className={`${
            modal ? "hidden" : "flex"
          } outline w-[50%] p-2 outline-3 outline-slate-300 text-lg font-semibold tracking-wider indent-6 rounded-xl `}
        />
        <div
          className={`${modal ? "lg:flex" : "lg:hidden"}
           hidden text-lg justify-center items-center gap-16`}
        >
          <HashLink to="/">Home</HashLink>
          <HashLink to="/category">Category</HashLink>
          <HashLink to="/stores">Stores</HashLink>
          <HashLink to="/offers">Offers</HashLink>
          <HashLink to="/uploadProduct">Upload</HashLink>
        </div>
        <div className="lg:flex hidden justify-center items-center gap-12">
          <HashLink>
            <FaSearch onClick={() => setModal(!modal)} size={18} />
          </HashLink>
          <HashLink to="/wishlist">
            <FaHeart size={18} />
          </HashLink>
          <HashLink to="/orders">
            <FaShoppingBag size={18} />
          </HashLink>
          <HashLink to={currUser ? "/user" : "/login"}>
            {currUser == null ? (
              <FaRegUser size={18} />
            ) : (
              <p className="outline outline-slate-300 font-bold text-slate-500 h-7 w-7 rounded-full flex justify-center items-center">
                {currUser.email.charAt(0).toUpperCase()}
              </p>
            )}
          </HashLink>
        </div>
        <HashLink className="md:hidden block">
          <RiMenu3Fill />
        </HashLink>
      </div>
      <hr />
    </div>
  );
};

export default Header;
