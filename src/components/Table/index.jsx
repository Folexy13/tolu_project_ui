import React from "react";
import "./Styles.scss";
import EmptyState from "../EmptyState";
import moment from "moment";
import { DropdownButton } from "..";
import LoadingState from "../Loading";
const options = [
  { label: "Request", value: "request" },
  { label: "View", value: "view" },
];
const Table = ({ width, headData, bodyData, isLoading, type, isEmpty }) => {
  return (
    <>
      <table className="styled-table" style={{ width }}>
        <thead>
          <tr>
            {headData.map((el, i) => {
              return <th key={i}>{el}</th>;
            })}
          </tr>
        </thead>
        {!isEmpty && (
          <tbody>
            {type === "search"
              ? bodyData.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{el.stockName}</td>
                      <td>{el.type}</td>
                      <td>{el.size}</td>
                      <td>{el.description.split("x").join(" ")}</td>
                      <td>{el.location}</td>
                      <td>{moment(el.createdAt).format("lll")}</td>
                      <td>{el.quantity}</td>
                      <td>{el.threshold}</td>
                      <td>
                        <DropdownButton options={options} data={el} />
                      </td>
                    </tr>
                  );
                })
              : bodyData.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{el.stockItem.description}</td>
                      <td>{el.quantity}</td>
                      <td>{el.itemDescription}</td>
                      <td>{el.collectorName}</td>
                      <td>{el.issuerName}</td>
                      <td>{moment(el.createdAt).format("lll")}</td>
                      <td>{el.status}</td>
                    </tr>
                  );
                })}
          </tbody>
        )}
      </table>
      {isLoading && <LoadingState />}
      {isEmpty && !isLoading && <EmptyState data={"data"} color="#002" />}
    </>
  );
};

Table.defaultProps = {
  width: "100%",
  headData: [
    "Stock Item",
    "Quantity",
    "Description",
    "Collector Name",
    "Issuer Name",
    "Date/Time",
    "Status",
  ],
  bodyData: [
    {
      stockItem: "Nut",
      quantity: 1,
      description: "Crystal",
      collectorName: "Sophia Crystal",
      issuerName: "Rosalia Crystal",
      date: "7/21/2022",
    },
    {
      stockItem: "Pin",
      quantity: 2,
      description: "Ipsly",
      collectorName: "Mose Ipsly",
      issuerName: "Dirk Ipsly",
      date: "12/19/2022",
    },
    {
      stockItem: "Bolt & Nut",
      quantity: 3,
      description: "Blemings",
      collectorName: "Carol-jean Blemings",
      issuerName: "Haze Blemings",
      date: "7/10/2022",
    },
    {
      stockItem: "Nut",
      quantity: 4,
      description: "Lidyard",
      collectorName: "Kelsy Lidyard",
      issuerName: "Nicky Lidyard",
      date: "2/20/2022",
    },
    {
      stockItem: "Spring",
      quantity: 5,
      description: "Mintram",
      collectorName: "Fey Mintram",
      issuerName: "Loni Mintram",
      date: "10/6/2022",
    },
    {
      stockItem: "Bolt",
      quantity: 6,
      description: "Pollastrino",
      collectorName: "Kimbra Pollastrino",
      issuerName: "Jacynth Pollastrino",
      date: "7/12/2022",
    },
    {
      stockItem: "Hammer",
      quantity: 7,
      description: "Mutter",
      collectorName: "Cletis Mutter",
      issuerName: "Jesse Mutter",
      date: "3/13/2022",
    },
    {
      stockItem: "Spanner",
      quantity: 8,
      description: "Starton",
      collectorName: "Delmor Starton",
      issuerName: "Ulberto Starton",
      date: "11/7/2022",
    },
    {
      stockItem: "Nut",
      quantity: 9,
      description: "Jewer",
      collectorName: "Lila Jewer",
      issuerName: "Gustaf Jewer",
      date: "12/7/2022",
    },
    {
      stockItem: "Bolt",
      quantity: 10,
      description: "Crut",
      collectorName: "Abbey Crut",
      issuerName: "Gabie Crut",
      date: "9/16/2022",
    },
  ],
};
export default Table;
