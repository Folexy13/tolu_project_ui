import React, { useEffect, useState } from "react";
import { DashboardLayout, Table } from "../../../components";
import userOBJ from "../../../Classes";
import { CiFilter } from "react-icons/ci";
import { handelFiterFn } from "../../../utils/some";

const Inventory = () => {
  const [data, setData] = useState([]);
  const [stockName, setStockName] = useState("");
  const [transactionDate, setTransactionDate] = useState({
    fromDate: "",
    toDate: "",
  });
  const tableHeadData = [
    "Stock Item",
    "Quantity",
    "Description",
    "Date",
    "Action",
  ];
  useEffect(() => {
    const handleWebhook = async (event) => {
      await userOBJ.webhook().then((res) => {
        setData(res.data);
      });
      // Handle the incoming webhook event here
    };

    window.addEventListener("webhook", handleWebhook("webhook"));

    return () => {
      window.removeEventListener("webhook", handleWebhook);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="main">
        <div className="filter">
          <div className="first">
            <div className="box">
              <label htmlFor="">Stock</label>
              <input
                type="name"
                placeholder="enter stock name"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
              />
            </div>
            <div className="box">
              <label htmlFor="">From</label>
              <input
                type="date"
                onChange={(e) =>
                  setTransactionDate({
                    fromDate: e.target.value,
                    toDate: transactionDate.toDate,
                  })
                }
              />
            </div>
            <div className="box">
              <label htmlFor="">To</label>
              <input
                type="date"
                onChange={(e) =>
                  setTransactionDate({
                    fromDate: transactionDate.fromDate,
                    toDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="second">
            <button
              disabled={
                !stockName &&
                (!transactionDate.toDate || !transactionDate.fromDate)
              }
              style={{ border: data.length === 0 ? "2px solid #a69898" : 0 }}
              onClick={() => handelFiterFn(null, stockName, transactionDate)}
            >
              <CiFilter size={16} /> Filter
            </button>
          </div>
        </div>
      </div>
      <Table
        headData={tableHeadData}
        isEmpty={data?.length === 0}
        bodyData={data}
        type={"stock"}
      />
    </DashboardLayout>
  );
};

export default Inventory;
