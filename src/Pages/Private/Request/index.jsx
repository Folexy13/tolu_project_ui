import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import "./Styles.scss";
import { DashboardLayout, Spinner } from "../../../components";
import userOBJ from "../../../Classes";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import logo from "../../../assets/image/logo.JPG";

const PrintComponent = ({
  issuerName,
  collectorName,
  itemDescription,
  designation,
  quantity,
  pageRef,
  ...props
}) => {
  let todayDate = moment().format("ll");

  return (
    <div
      className="pdf-body"
      style={{
        minHeight: window.innerHeight,
        maxHeight: "fit-content",
        display: "none",
      }}
      ref={pageRef}
    >
      <img
        src={logo}
        alt=""
        width={200}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px auto",
        }}
      />
      <h1> Request Verification Form</h1>
      <div className="heading">Check Request</div>
      <div className="float-left">
        <div className="diff">
          <p>Department:</p>
          <p>____________________</p>
        </div>
        <div className="diff">
          <p>Date: {todayDate}</p>
        </div>
      </div>
      <div className="heading">Stock Information</div>
      <div className="diff sect">
        <p>Unit Demanded: {quantity}</p>
        <p>Designation: {designation}</p>
      </div>
      <div className="heading">Collector Information</div>
      <div className="diff sect">
        <p>Name: {collectorName}</p>
        <p>Signature: ______________________</p>
      </div>
      <div className="heading">Issuer Information</div>
      <div className="diff sect">
        <p> Name: {issuerName}</p>
        <p>Signature: ______________________</p>
      </div>
      <div className="heading">Production Manager</div>
      <div className="diff sect">
        <p> Name: Bola Tolulope</p>
        <p>Signature: ______________________</p>
      </div>
      {props.children}
    </div>
  );
};

const PrintButton = ({
  pageRef,
  issuerName,
  collectorName,
  itemDescription,
  designation,
  quantity,
}) => {
  const styles = `
  .pdf-body{
   border-radius: 5px;
         max-height: 70vh !important;
         background-color: #fff;
         padding: 30px 0px;
  }
  img{
    display: "flex",
          justify-content: "center",
          align-items: "center",
          margin: "10px auto",
  }
  .float-left{
            padding: 10px 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
         }
         .sect{
         padding: 20px 40px 20px 40px;
         display: flex;
         justify-content: space-between;
         
        }
         .heading{
            background-color: brown;
            color: #fff;
            text-align: center;
            padding: 10px 0;
            margin: 10px 0;
         }
         @media print {
   heading {
        background-color: brown !important;
        print-color-adjust: exact; 
    }
    body{-webkit-print-color-adjust: exact}
}
    body {
      font-family: Arial, sans-serif;
      font-size: 12pt;
    }
    h1, h2, h3 {
       text-align: center;
            color: brown;
    }
   .print{display:none}
    p{
            margin: 5px 0;
            font-size:18px
          }
            p:nth-child(2){
              margin-top: 0px;
            }
    .diff{
      margin:10px 0
    }
  `;

  return (
    <ReactToPrint
      trigger={() => (
        <button className="print" variant="primary">
          Print
        </button>
      )}
      content={() => pageRef.current}
      documentTitle="Request Form"
      bodyClass="pdf-body"
      pageStyle={styles}
      // onAfterPrint={() => {
      //   // Reset form values after printing
      //   issuerName ;
      //   collectorName ;
      //   itemDescription && setItemDescription("");
      //   designation && setDesignation("");
      //   quantity && setQuantity("");
      // }}
    />
  );
};

const App = () => {
  const { id } = useParams();
  const [stockItem, setStockItem] = useState({});
  const [allStocks, setAllStocks] = useState([]);
  useEffect(() => {
    if (id) {
      const fetchStock = async () => {
        await userOBJ.get_stock(id).then((res) => {
          setStockItem(res.payload);
        });
      };
      fetchStock();
    }
  }, []);

  useEffect(() => {
    const fetchAllStocks = async () => {
      await userOBJ.get_all_stocks().then((res) => {});
    };
  });

  const [issuerName, setIssuerName] = useState("");
  const [collectorName, setCollectorName] = useState("");
  const [itemDescription, setItemDescription] = useState(stockItem.description);
  const [designation, setDesignation] = useState("");
  const [quantity, setQuantity] = useState(1);
  const pageRef = useRef(null);
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issuerName || !collectorName || !designation) {
      toast.error("All Fields are required");
      return;
    }
    setIsLoading(true);

    let payload = {
      issuerName,
      collectorName,
      itemDescription: stockItem.description,
      designation,
      stockItem: id,
      quantity,
    };
    await userOBJ.add_new_request(payload).then((res) => {
      if (res.status) {
        toast.success(res.message);
        pageRef.current.style.display = "block";
        setIsSubmmited(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(res.message);
      }
    });
    PrintButton(
      pageRef,
      issuerName,
      collectorName,
      itemDescription,
      designation,
      quantity
    );
    // handle form submission
  };
  if (!id) {
    return <DashboardLayout>Page Coming Soon...</DashboardLayout>;
  }

  return (
    <DashboardLayout isLoading={false}>
      <div className="main">
        {!isSubmmited && (
          <form onSubmit={handleSubmit}>
            <h1>{stockItem.stockName}</h1>
            <div className="form-control">
              <p htmlFor="">Issuer Name</p>
              <input
                type="text"
                value={issuerName}
                onChange={(e) => setIssuerName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <p htmlFor="">Collector Name</p>
              <input
                type="text"
                value={collectorName}
                onChange={(e) => setCollectorName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <p htmlFor="">Item Description</p>
              <input type="text" value={stockItem?.description} />
            </div>
            <div className="form-control">
              <p htmlFor="">Item Location</p>
              <input type="text" value={stockItem?.location} />
            </div>
            <div className="form-control">
              <p htmlFor="">Designation</p>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <div className="form-control">
              <p htmlFor="">Quantity</p>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button disabled={isLoading} type="submit">
              {isLoading ? <Spinner isLoading={isLoading} /> : "Submit"}
            </button>
          </form>
        )}

        <PrintComponent
          issuerName={issuerName}
          collectorName={collectorName}
          itemDescription={itemDescription}
          designation={designation}
          quantity={quantity}
          pageRef={pageRef}
        >
          {isSubmmited && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="print">
                <button onClick={() => nav(-1)}>Exit</button>
              </div>
              <PrintButton
                pageRef={pageRef}
                issuerName={issuerName}
                collectorName={collectorName}
                itemDescription={itemDescription}
                designation={designation}
                quantity={quantity}
              />
            </div>
          )}
        </PrintComponent>
      </div>
    </DashboardLayout>
  );
};

export default App;
