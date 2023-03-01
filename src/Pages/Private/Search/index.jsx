import React, { useEffect, useState } from "react";
import "./Styles.scss";
import { DashboardLayout, Pagination, Table } from "../../../components";
import { useLocation } from "react-router-dom";
import userOBJ from "../../../Classes";

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useLocation();
  const [data, setData] = useState([]);
  // const itemsPerPage = 2;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // TODO: update the displayed items based on the selected page number
  };

  // const

  useEffect(() => {
    const fetchData = async () => {
      await userOBJ
        .get_search_stock(currentPage, search.split("=")[1])
        .then((res) => {
          setData(res);
        });
    };
    fetchData();
  }, [currentPage, search]);

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
  return (
    <DashboardLayout isLoading={false}>
      <div className="main">
        <Table
          headData={tableHeadData}
          isEmpty={data?.payload?.length === 0}
          type={"search"}
          bodyData={data?.payload}
        />
        {!!data?.payload?.length && (
          <Pagination
            // itemsPerPage={itemsPerPage}
            totalPages={data?.totalPages}
            totalItems={data?.payload?.length}
            paginate={paginate}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
