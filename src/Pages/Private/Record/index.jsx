import React, { useEffect } from "react";
import { DashboardLayout, Table } from "../../../components";
import { CiFilter } from "react-icons/ci";
import "./Styles.scss";
import { useState } from "react";
import userOBJ from "../../../Classes";
import { toast } from "react-toastify";

const Record = () => {
  const [users, setUsers] = useState([]);
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
    };
    const fetchStock = async () => {
      await userOBJ.get_all_stocks(currentPage).then((res) => {
        if (res.status) {
          setUsers(res.data.payload);
        }
      });
    };
    fetchUsers();
    fetchStock();
    if (fetchStock() && fetchUsers()) {
      setPageIsLoading(false);
    }
  }, []);

  console.log(users);

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
            <button>
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
