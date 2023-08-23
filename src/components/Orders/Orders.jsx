import React, { useState } from 'react'
import Cart from '../Cart/Cart'
import { useLoaderData } from 'react-router-dom'
import ReviewItem from '../ReviewItem/ReviewItem';
import {removeFromDb} from '../../utilities/fakedb';
import './Orders.css'

const Orders = () => {
  const cartDataLoader = useLoaderData();
  const [cart, setCart] = useState(cartDataLoader);

  const handelRemoveFromCart = (id) =>{
    const remaining = cart.filter(product => product.id !== id);
    setCart(remaining)
    removeFromDb(id)
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
              <Cart cart={cart}></Cart>
        </div>
    </div>
  )
}

export default Orders