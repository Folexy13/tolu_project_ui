import React, { useEffect } from "react";
import "./Styles.scss";
import {
  Card,
  Chart,
  DashboardLayout,
  Modal,
  Spinner,
  Table,
} from "../../../components";
import { useState } from "react";
import { getStoredAuthToken } from "../../../utils";
import userOBJ from "../../../Classes";
import { toast } from "react-toastify";
import { FiPlus, FiUserPlus } from "react-icons/fi";
const chartdata = [
  {
    created_at__date: "12/26/2022",
    day_sales: 10,
    axisLabel: "Spanner",
  },
  {
    created_at__date: "12/29/2022",
    day_sales: 15,
    axisLabel: "Bolt",
  },
  {
    created_at__date: "12/29/2022",
    day_sales: 17,
    axisLabel: "Nut",
  },
  {
    created_at__date: "1/6/2023",
    day_sales: 20,
    axisLabel: "Wheel",
  },
  {
    created_at__date: "1/10/2023",
    day_sales: 17,
    axisLabel: "Spanner",
  },
  {
    created_at__date: "1/19/2023",
    day_sales: 15,
    axisLabel: "Bolt",
  },
  {
    created_at__date: "1/21/2023",
    day_sales: 10,
    axisLabel: "Tool",
  },
  {
    created_at__date: "1/24/2023",
    day_sales: 5,
    axisLabel: "Spanner",
  },
  {
    created_at__date: "1/26/2023",
    day_sales: 5,
    axisLabel: "Wheel",
  },
  {
    created_at__date: "2/1/2023",
    day_sales: 10,
    axisLabel: "Spanner",
  },
];

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [stockName, setStockName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const handlePostStock = async (e) => {
    setLoading(true);
    e.preventDefault();
    let payload = {
      stockName,
      quantity,
      size,
      type,
      location,
    };
    await userOBJ.user_add_stock(payload).then((res) => {
      if (res.status) {
        toast.success(res.message);
        setShow(!show);
        setStockName("");
        setQuantity("");
        setSize("");
        setType("");
        setLocation("");
        setLoading(false);
      } else {
        toast.error(res.message);
        setLoading(false);
        return;
      }
    });
  };

  return (
    <DashboardLayout isLoading={false}>
      <div className="main">
        <div className="btn-flex">
          <div className="button" onClick={handleShow}>
            <FiPlus fontWeight={800} />
            Add New Stock
          </div>
          <div className="button" onClick={handleShow}>
            <FiUserPlus fontWeight={800} />
            Request New Stock
          </div>
        </div>

        <Card width={"calc(100% - 40px)"}>
          <Chart chartdata={chartdata} />
        </Card>

        <div style={{ marginTop: "60px", color: "#002" }}>
          <h1>Recent Transactions</h1>
          <Table bodyData={tableData} isEmpty={tableData.length === 0} />
        </div>
        <Modal close={!show} onClick={handleShow}>
          <form onSubmit={handlePostStock}>
            <div className="form-control">
              <label htmlFor="name">Item</label>
              <input
                type="text"
                required
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="size">Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Quantity</label>
              <input
                type="number"
                min={1}
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-control">
              <button disabled={loading}>
                {loading ? <Spinner isLoading={loading} /> : "Add Stock"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
