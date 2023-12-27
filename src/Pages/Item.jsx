import React from "react";
import { Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../redux/ItemSlice"
const { Meta } = Card;


function Item({ item }) {
  const dispatch = useDispatch();
  const handleAddCart = (item) => {
    console.log("Add to Cart");
   // const payload = dispatch({ type: "addToCart", payload: { ...item } , quantity: 1});
   const payload=  dispatch(addToCart(item))
    console.log(payload);
  };

  return (
    <div>
      <Card
        hoverable
        style={{ width: "250", marginTop: "50px" }}
        cover={
          <img
            style={{
              width: "100%",
              height: "250px",
              objectFit: "contain",
            }}
            src={item.image}
            alt={item.name}
          />
        }
      >
        <Meta title={item.name} />
        <h4>Price: Rs.{item.price}</h4>
        <Button type="primary" onClick={() => handleAddCart(item)}>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
}

export default Item;
