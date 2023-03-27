import React, { useEffect } from "react";
import { DashboardLayout, Table } from "../../../components";
import { CiFilter } from "react-icons/ci";
import "./Styles.scss";
import { useState } from "react";
import userOBJ from "../../../Classes";

const Record = () => {
  const [users, setUsers] = useState([]);
  const [stock, setStock] = useState([]);
  const [name, setName] = useState("");
  const [transactionDate, setTransactionDate] = useState({
    fromDate: "",
    toDate: "",
  });
  const [stockName, setStockName] = useState("");
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  //filter data
  const [data, setData] = useState([]);
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
    const fetchData = async () => {
      await userOBJ.get_all_records().then((res) => {
        if (res.status) {
          setRecords(res.payload);
          setPageIsLoading(false);
        }
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [currentPage]);

  const handleDateFmt = (date) => {
    let formattedDate;
    formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  };
  const handleGreaterTimer = (start, stop) => {
    if (
      new Date(start).getTime() > new Date(stop).getTime() &&
      (start || stop)
    ) {
      alert("Start time can't be greater than stop time");
      return;
    } else return 1 + 1 === 2;
  };

  const handelFiterFn = (name, stockItem, tDate) => {
    let filteredRecord = records;
    const checkTime = handleGreaterTimer(tDate.fromDate, tDate.toDate);
    if (checkTime) {
      if (stockItem && name && (tDate.fromDate || tDate.fromDate)) {
        filteredRecord = filteredRecord.filter(
          (record) =>
            record.stockItem.description
              ?.toLowerCase()
              ?.includes(stockItem?.toLowerCase()) &&
            (record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
              record.collectorName
                ?.toLowerCase()
                ?.includes(name?.toLowerCase())) &&
            handleDateFmt(record.createdAt) >= tDate.fromDate &&
            handleDateFmt(record.createdAt) <= tDate.toDate
        );
      } else if (stockItem && name) {
        filteredRecord = filteredRecord.filter(
          (record) =>
            record.stockItem.itemDescription
              ?.toLowerCase()
              ?.includes(stockItem?.toLowerCase()) &&
            (record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
              record.collectorName
                ?.toLowerCase()
                ?.includes(name?.toLowerCase()))
        );
      } else if (stockItem && (tDate.fromDate || tDate.fromDate)) {
        filteredRecord = filteredRecord.filter(
          (record) =>
            record.stockItem.itemDescription
              ?.toLowerCase()
              ?.includes(stockItem?.toLowerCase()) &&
            handleDateFmt(record.createdAt) >= tDate.fromDate &&
            handleDateFmt(record.createdAt) <= tDate.toDate
        );
      } else if (name && (tDate.fromDate || tDate.fromDate)) {
        filteredRecord = filteredRecord.filter(
          (record) =>
            (record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
              record.collectorName
                ?.toLowerCase()
                ?.includes(name?.toLowerCase())) &&
            handleDateFmt(record.createdAt) >= tDate.fromDate &&
            handleDateFmt(record.createdAt) <= tDate.toDate
        );
      } else if (stockItem) {
        filteredRecord = filteredRecord.filter((record) =>
          record.stockItem.itemDescription
            ?.toLowerCase()
            ?.includes(stockItem?.toLowerCase())
        );
      } else if (name) {
        filteredRecord = filteredRecord.filter(
          (record) =>
            record.issuerName?.toLowerCase()?.includes(name?.toLowerCase()) ||
            record.collectorName?.toLowerCase()?.includes(name?.toLowerCase())
        );
      } else if (tDate.fromDate || tDate.fromDate) {
        filteredRecord = filteredRecord.filter(
          (record) =>
            handleDateFmt(record.createdAt) >= tDate.fromDate &&
            handleDateFmt(record.createdAt) <= tDate.toDate
        );
      }
    }

    setData(filteredRecord);
    // setName("");
    // setStockName("");
  };
  return (
    <DashboardLayout pageIsLoading={pageIsLoading}>
      <div className="main">
        <div className="filter">
          <div className="first">
            <div className="box">
              <label htmlFor="">Name</label>
              <input
                type="name"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <select name="" id="">
                <option value="" selected disabled>
                  Select a name
                </option>
                {users.map((el, i) => {
                  return <option key={i}>{el.fullname}</option>;
                })}
              </select> */}
            </div>
            <div className="box">
              <label htmlFor="">Stock</label>
              <input
                type="name"
                placeholder="enter stock name"
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
              />

              {/* <select name="" id="">
                <option value="" selected disabled>
                  Select a stock
                </option>
                {stock.map((el, i) => {
                  return <option key={i}>{el.description}</option>;
                })}
              </select> */}
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
                !name &&
                !stockName &&
                (!transactionDate.toDate || !transactionDate.fromDate)
              }
              style={{ border: records.length === 0 ? "2px solid #a69898" : 0 }}
              onClick={() => handelFiterFn(name, stockName, transactionDate)}
            >
              <CiFilter size={16} /> Filter
            </button>
          </div>
        </div>
      </div>
      <Table
        headData={tableHeadData}
        isEmpty={records?.length === 0}
        bodyData={data.length ? data : records}
      />
    </DashboardLayout>
  );
};

export default Record;
