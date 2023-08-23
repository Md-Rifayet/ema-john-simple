import React, { useState } from 'react'
import Cart from '../Cart/Cart'
import { Link, useLoaderData } from 'react-router-dom'
import ReviewItem from '../ReviewItem/ReviewItem';
import {deleteShoppingCart, removeFromDb} from '../../utilities/fakedb';
import './Orders.css'

const Orders = () => {
  const cartDataLoader = useLoaderData();
  const [cart, setCart] = useState(cartDataLoader);

  const handelRemoveFromCart = (id) =>{
    const remaining = cart.filter(product => product.id !== id);
    setCart(remaining)
    removeFromDb(id)
  }

const handelClearCart = () =>{
  deleteShoppingCart()
  setCart([]);
}


  return (
    <div className='shop-container'>
        <div className='review-container'>
              {
                cart.map(products => <ReviewItem
                  key={products.id} 
                  products={products}
                  handelRemoveFromCart={handelRemoveFromCart}>
                </ReviewItem>)
              }
        </div>
        <div className='cart-container'>
              <Cart
               cart={cart}
               handelClearCart={handelClearCart}>
                <Link className='proceed-link' to='/checkout'>
                <button className='btn-proced'>Proced Checkout</button>
                </Link>
              </Cart>
        </div>
    </div>
  )
}

export default Orders