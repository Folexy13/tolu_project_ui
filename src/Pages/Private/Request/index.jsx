import React, { useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import "./Styles.scss";
import { DashboardLayout, Spinner } from "../../../components";
import userOBJ from "../../../Classes";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import moment from "moment";

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
      style={{ height: window.innerHeight, display: "none" }}
      ref={pageRef}
    >
      <h1> Verification Form</h1>
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
    // p {
    //   font-weight: bold;
    //   font-size:24px;
    //   display:block
    // }
    // p {
    //   margin-left: 10px;
    //   font-size:20px;
    //   border:
    // }
    p{
            margin: 5px 0;}
            p:nth-child(2){
              margin-top: 0px;
            }
    .diff{
      margin:10px 0
    }
  `;

  return (
    <ReactToPrint
      trigger={() => <button variant="primary">Print</button>}
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
  const [issuerName, setIssuerName] = useState("");
  const [collectorName, setCollectorName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [quantity, setQuantity] = useState(1);
  const pageRef = useRef(null);
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issuerName || !itemDescription || !collectorName || !designation) {
      toast.error("All Fields are required");
      return;
    }
    setIsLoading(true);

    let payload = {
      issuerName,
      collectorName,
      itemDescription,
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

  return (
    <DashboardLayout isLoading={false}>
      <div className="main">
        {!isSubmmited && (
          <form onSubmit={handleSubmit}>
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
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
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
            <PrintButton
              pageRef={pageRef}
              issuerName={issuerName}
              collectorName={collectorName}
              itemDescription={itemDescription}
              designation={designation}
              quantity={quantity}
            />
          )}
        </PrintComponent>
      </div>
    </DashboardLayout>
  );
};

export default App;
