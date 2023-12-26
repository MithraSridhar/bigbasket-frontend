import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../global";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Item from "./Item";

function Home() {
  const [itemData, setItemData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.itemShop.cartItems);
  console.log(cartItems);
  useEffect(() => {
    axios
      .get(`${API}/items/get-items`)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        setItemData(res.data);
        localStorage.setItem("cartItems", JSON.stringify(res.data));
      })
      .catch((err) => {
        dispatch({ type: "hideLoading" });
        console.log(err);
      });
  }, []);

  console.log(itemData);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "end",
          alignItems: "flex-end",
          marginTop: "20px",
          marginRight:"40px"
        }}
      >
        <button
          type="button"
          className="btn btn-primary position-relative"
          onClick={() => navigate("/cart")}
        >
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItems.length}
          </span>
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {itemData.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
