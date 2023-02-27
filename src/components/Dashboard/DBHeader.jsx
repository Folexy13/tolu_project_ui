import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import "../../Pages/Private/Main/Styles.scss";
import userOBJ from "../../Classes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import Spinner from "../Spinner";
const DBHeader = (page) => {
  const [searchParams, setSearchParams] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  let handleSearch = async () => {
    setIsLoading(true);
    await userOBJ
      .get_search_stock(1, `stockName=${searchParams}`)
      .then((res) => {
        if (res.status) {
          setIsLoading(false);
          nav(ROUTES.SEARCH + `?stockName=${searchParams}`, { state: res });
        }
      });
  };
  useEffect(() => {
    let handleSearch = async () => {
      setIsLoading(true);
      await userOBJ
        .get_search_stock(1, `stockName=${searchParams}`)
        .then((res) => {
          if (res.status) {
            setIsLoading(false);
            nav(ROUTES.SEARCH + `?stockName=${searchParams}`, { state: res });
          }
        });
    };
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        // event.preventDefault();
        handleSearch();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <div className="section">
      <div className="search_page">
        <div className="search">
          {isLoading ? (
            <Spinner isLoading={isLoading} />
          ) : (
            <BsSearch size={22} onClick={handleSearch} />
          )}
          <input
            type="text"
            placeholder="Search here..."
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </div>
        <div className="icon">
          <RxAvatar size={40} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
