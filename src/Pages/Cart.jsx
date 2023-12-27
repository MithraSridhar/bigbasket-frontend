import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { updateCart } from "../redux/ItemSlice";
import axios from "axios";
import { API } from "../global";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state) => state.itemShop.cartItems);
  //    console.log(cartItems.length)

  const [subTotal, setSubTotal] = useState(0);
  const [billChargeModal, setBillChargeModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQuantity = (itemID) => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (itemID) => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * 1;
    });
    setSubTotal(temp);
  }, [cartItems]);

  const onFinish = (values) => {
    const reqObject = {
      customerName: values.customerName,
      customerPhoneNumber: Number(values.customerPhoneNumber),
      paymentMode: values.paymentMode,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAMount: Number(subTotal + (subTotal / 100) * 10),
      userId: JSON.parse(localStorage.getItem("user_data"))._id,
    };
    console.log(reqObject);
    axios.post(`${API}/bills/charge-bill`, reqObject).then((res) => {
      message.success("Bill added successfully");
      localStorage.setItem("bill_data", JSON.stringify(reqObject));
      navigate("/bills");
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" width="50" height="50" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (item) => (
        <>
          <button onClick={() => increaseQuantity(item._id)}>+</button>
          <span>{quantity}</span>
          <button onClick={() => decreaseQuantity(item._id)}>-</button>
        </>
      ),
    },
  ];

  return (
    <>
      <h1>Cart Items</h1>
      <Table
        dataSource={cartItems}
        columns={columns}
        bordered
        pagination={false}
      />
      <hr />
      <div className="d-flex justify-content-end flex-column">
        <div>
          <h3>
            SUB TOTAL: <b>{subTotal}</b>
          </h3>
        </div>
      </div>
      <Button type="primary" onClick={() => setBillChargeModal(true)}>
        Charge Bill
      </Button>
      <Modal
        title="Charge Bill"
        visible={billChargeModal}
        onCancel={() => setBillChargeModal(false)}
      >
        <Form onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>

          <Form.Item name="customerPhoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div>
            <h3>
              SubTotal: <b>{subTotal}</b>
            </h3>
            <h5>
              Tax: <b>Rs. {((subTotal / 100) * 10).toFixed(2)}</b>
            </h5>
            <h5>
              Grand Total: <b>Rs. {subTotal + (subTotal / 100) * 10}</b>
            </h5>
          </div>
          <div>
            <Button
              className="d-flex justify-content-end"
              type="primary"
              htmlType="submit"
            >
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
      {/* <div>
      <h1>Cart Items</h1>
      <table>
          <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>

              </tr>

          </thead>
          <tbody>
          {cartItems.map((item)=>(
            <>
           <tr>{item.name}</tr>
           <tr>{item.name}</tr>
           <tr>{item.name}</tr>
           </>
          ))}
          </tbody>

      </table>
  
      
      </div>  */}
    </>
  );
}

export default Cart;
