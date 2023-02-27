import React, { useEffect } from "react";
import "./Styles.scss";
import { DashboardLayout, Table } from "../../../components";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { state } = useLocation();
  // const

  useEffect(() => {}, []);

  const tableHeadData = [
    "Name",
    "Type",
    "Size",
    "Description",
    "Location",
    "Entry Date",
    "Stock Level",
    "Reorder Level",
    "Action",
  ];
  console.log(state.payload);
  return (
    <DashboardLayout isLoading={false}>
      <div className="main">
        <Table
          headData={tableHeadData}
          isEmpty={state?.payload.length === 0}
          type={"search"}
          bodyData={state.payload}
        />
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
