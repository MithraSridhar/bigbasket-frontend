import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { API } from "../global";
import { Button } from "antd";
import ReactToPrint, { useReactToPrint } from "react-to-print";

function Bill() {
  const componentRef = React.useRef(null);
  const [billData, setBillData] = useState([]);
  const [selectedBills, setSelectedBills] = useState(null);

  //     //getting bills of all customers
  // const getAllBills=()=>{
  // axios.get(`${API}/bills/get-bill`)
  // .then((res)=>{
  //     const data = res.data
  //     setBillData(data)
  // })
  // }

  // useEffect(()=>{
  //     getAllBills()
  // } ,[])
  // console.log(billData)

  //getting bill of single customer
  const getBill = () => {
    const reqBody = {
      customerName: JSON.parse(localStorage.getItem("bill_data")).customerName,
    };
    // const reqBody={
    //     "customerName": "test"
    // }
    console.log(reqBody);
    axios.post(`${API}/bills/get-bill-customer`, reqBody).then((res) => {
      const data = res.data;
      console.log(data);
      setBillData(data);
    });
  };

  useEffect(() => {
    getBill();
  }, []);
  console.log(billData);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  return (
    <div>
      <h3>Bill Details</h3>
      <table className="table table-bordered" ref={componentRef}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Price</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {billData.map((item) => {
            return (
              <tr>
                <td>{item.customerName}</td>
                <td>Rs. {item.totalAMount}</td>
                <td>Rs. {item.subTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button type="primary" onClick={handlePrint}>
        Print Bill
      </Button>

      {/* <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName"
        onAfterPrint={handleAfterPrint}
        onBeforeGetContent={handleOnBeforeGetContent}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      /> */}
    </div>
  );
}

export default Bill;
