import React, { useEffect } from "react";
import { DashboardLayout, Table } from "../../../components";
import { CiFilter } from "react-icons/ci";
import "./Styles.scss";
import { useState } from "react";
import userOBJ from "../../../Classes";

const Record = () => {
  const [users, setUsers] = useState([]);
  const [stock, setStock] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const tableHeadData = [
    "Stock Item",
    "Quantity",
    "Description",
    "Collector Name",
    "Issuer Name",
    "Date",
    "Action",
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      await userOBJ.get_all_users(currentPage).then((res) => {
        if (res.status) {
          setUsers(res.data.payload);
        }
      });
      await userOBJ.get_all_stocks(currentPage).then((res) => {
        if (res.status) {
          setStock(res.payload.payload);
          setPageIsLoading(false);
        }
      });
    };
    fetchUsers();
  }, [currentPage, stock]);

  const [data, setData] = useState([]);
  return (
    <DashboardLayout isLoading={pageIsLoading}>
      <div className="main">
        <div className="filter">
          <div className="first">
            <div className="box">
              <label htmlFor="">Name</label>
              <select name="" id="">
                <option value="" selected disabled>
                  Select a name
                </option>
                {users.map((el, i) => {
                  return <option key={i}>{el.fullname}</option>;
                })}
              </select>
            </div>
            <div className="box">
              <label htmlFor="">Stock</label>
              <select name="" id="">
                <option value="" selected disabled>
                  Select a stock
                </option>
                {stock.map((el, i) => {
                  return <option key={i}>{el.description}</option>;
                })}
              </select>
            </div>
            <div className="box">
              <label htmlFor="">From</label>
              <input type="date" />
            </div>
            <div className="box">
              <label htmlFor="">To</label>
              <input type="date" />
            </div>
          </div>
          <div className="second">
            <button
              disabled={data.length === 0}
              style={{ border: data.length === 0 ? "2px solid #a69898" : 0 }}
            >
              <CiFilter size={16} /> Filter
            </button>
          </div>
        </div>
      </div>
      <Table headData={tableHeadData} isEmpty={data?.length === 0} />
    </DashboardLayout>
  );
};

export default Record;
