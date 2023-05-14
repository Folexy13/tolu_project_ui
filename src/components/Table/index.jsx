import React, { useState } from "react";
import "./Styles.scss";
import EmptyState from "../EmptyState";
import moment from "moment";
import { DropdownButton, Modal, Spinner } from "..";
import LoadingState from "../Loading";
import userOBJ from "../../Classes";
import { toast } from "react-toastify";
const options = [
  { label: "Request", value: "request" },
  { label: "View", value: "view" },
];
const optionStat = [
  { label: "Pending", value: "Pending" },
  { label: "Approved", value: "Approved" },
  { label: "Not Approved", value: "Not Approved" },
  { label: "Updateable", value: "Updateable" },
];

const Table = ({ width, headData, bodyData, isLoading, type, isEmpty }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [stock,setStock] =useState("...")
  const [quantity, setQuantity] = useState(0);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSelect = (val) => {
    setShow(true);
    setId(val);
    console.log(val);
  };
  const handleTopUp = async (e) => {
    e.preventDefault();
    setLoading(true)
    const payload = {
      id,
      field:quantity,
      type:'Update Stock'
    };
    userOBJ.update_stock(payload).then((res) => {
      if (res.status) {
        toast.success(res.message);
        setLoading(false);
        setShow(false);
        setQuantity("");
        return;
      } else {
        toast.error(res.message);
        setLoading(false);
        return;
      }
    });
  };
  const handleOpenViewModal =async(val)=>{
    setLoading(true)
    const response = await userOBJ.get_stock(val)
    if(response){
      setLoading(false)
      setStock(response.payload)
      setShow2(!show2)
    }
  }
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
                        <DropdownButton options={options} data={el} onClick={handleOpenViewModal} loading={loading}/>
                      </td>
                    </tr>
                  );
                })
              : type === "stock"
              ? bodyData.map((el, i) => {
                  console.log(el);
                  return (
                    <tr key={i}>
                      <td>{el?.stockName}</td>
                      <td>{el?.quantity}</td>
                      <td>{el?.description}</td>
                      <td>{moment(el?.createdAt).format("lll")}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => handleSelect(el?._id)}
                        >
                          Order now
                        </button>
                      </td>
                    </tr>
                  );
                })
              : bodyData.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{el?.stockItem?.description}</td>
                      <td>{el?.quantity}</td>
                      <td>{el?.itemDescription}</td>
                      <td>{el?.collectorName}</td>
                      <td>{el?.issuerName}</td>
                      <td>{moment(el?.createdAt).format("lll")}</td>
                      <td> <DropdownButton options={optionStat} data={el} nil={el.status} /></td>
                    </tr>
                  );
                })}
          </tbody>
        )}
        <Modal width={200} close={!show} onClick={() => setShow(!show)}>
          <form onSubmit={handleTopUp}>
            <div className="form-control">
              <label htmlFor="name">Quantity</label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button
              disabled={loading}
              type="submit"
            >
              {loading ? <Spinner loading={loading} /> : "Order now"}
            </button>
          </form>
        </Modal>
        <Modal width={500} close={!show2} onClick={() => setShow2(!show2)}>
          <div className="data-stock">
          <div className="flex">
              <p style={{fontWeight:600}}>Name: </p>
             <p>{stock?.stockName}</p>
             </div>
             <div className="flex">
              <p style={{fontWeight:600}}>Description: </p>
             <p>{stock?.description}</p>
             </div>
             <div className="flex">
              <p style={{fontWeight:600}}>Type: </p>
             <p>{stock?.type}</p>
             </div>
             <div className="flex">
              <p style={{fontWeight:600}}>Size: </p>
             <p>{stock?.size}</p>
             </div>
             <div className="flex">
              <p style={{fontWeight:600}}>Location: </p>
             <p>{stock?.location}</p>
             </div>
             <div className="flex">
              <p style={{fontWeight:600}}>Quantity: </p>
             <p>{stock?.quantity}</p>
             </div>
             <div className="flex">
              <p style={{fontWeight:600}}>Threshold: </p>
             <p>{stock?.threshold}</p>
             </div>
          </div>
        </Modal>
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
      stockItem: "---",
      quantity:'---',
      description: "---",
      collectorName: "---",
      issuerName: "----",
      date: "-----",
    },
   
  ],
};
export default Table;
