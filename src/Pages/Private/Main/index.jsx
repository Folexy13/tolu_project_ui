import React from "react";
import "./Styles.scss";
import { RxPlus } from "react-icons/rx";
import {
  Card,
  Chart,
  DashboardLayout,
  Modal,
  Table,
} from "../../../components";
import { useState } from "react";
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
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <DashboardLayout>
      <div className="main">
        <div className="button" onClick={handleShow}>
          <RxPlus fontWeight={800} />
          Add New Stock
        </div>
        <Card width={"calc(100% - 40px)"}>
          <Chart chartdata={chartdata} />
        </Card>

        <div style={{ marginTop: "60px", color: "#002" }}>
          <h1>Recent Transactions</h1>
          <Table />
        </div>
        <Modal close={!show} onClick={handleShow}>
          <form>
            <div className="form-control">
              <label htmlFor="name">Stock Name</label>
              <input type="text" required />
            </div>
            <div className="form-control">
              <label htmlFor="type">Type</label>
              <input type="text" />
            </div>
            <div className="form-control">
              <label htmlFor="size">Size</label>
              <input type="text" />
            </div>
            <div className="form-control">
              <label htmlFor="name">Location</label>
              <input type="text" />
            </div>
            <div className="form-control">
              <label htmlFor="name">Quantity</label>
              <input type="number" min={1} required />
            </div>
            <div className="form-control">
              <button>Add Stock</button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
