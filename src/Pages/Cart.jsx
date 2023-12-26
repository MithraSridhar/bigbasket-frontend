import React from 'react'
import { useDispatch, useSelector } from "react-redux";

function Cart() {
    
    const cartItems = useSelector((state)=>state.itemShop.cartItems)
    console.log(cartItems.length)
  return (
    <div>Cart</div>
  )
}

export default Cart