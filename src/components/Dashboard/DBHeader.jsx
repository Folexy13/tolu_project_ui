import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import "../../Pages/Private/Main/Styles.scss";
import userOBJ from "../../Classes";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

import Spinner from "../Spinner";
import { getClientUser } from "../../utils";
const DBHeader = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useState(search.split("=")[1] || "");

  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  let handleSearch = async () => {
    setIsLoading(true);
    await userOBJ.get_search_stock(1, searchParams).then((res) => {
      if (res.status) {
        setIsLoading(false);
        nav(ROUTES.SEARCH + `?stockName=${searchParams}`, { state: res });
      }
    });
  };

  useEffect(() => {
    if (searchParams) {
      const listener = async (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          console.log("Enter key was pressed. Run your function.");
          setIsLoading(true);
          await userOBJ.get_search_stock(1, searchParams).then((res) => {
            if (res.status) {
              setIsLoading(false);
              nav(ROUTES.SEARCH + `?stockName=${searchParams}`, { state: res });
            }
          });
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, [searchParams, nav]);
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
        <div className="icon" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <RxAvatar size={40} style={{ cursor: "pointer" }} />
          <p style={{margin:0,fontWeight:900}}>
           {getClientUser().fullname}
          </p>
          <p style={{margin:0}}>
           {getClientUser().role.split('_').join(' ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
