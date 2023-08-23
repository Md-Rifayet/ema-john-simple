import React, { useEffect, useState } from 'react';
import {addToDb, deleteShoppingCart, getShoppingCart} from '../../utilities/fakedb';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        const storedCart =getShoppingCart();
        const savedCart =[]
        //Step:1 Get id
        for(const id in storedCart){
            // step 2 get the product by id
            const addedproduct = products.find(product => product.id === id);
           
          if(addedproduct){
            // step 3: get quantity of the product
           const quantity =storedCart[id];
           addedproduct.quantity = quantity;
        // step 4: added product add to the saved cart
        savedCart.push(addedproduct)
          }
        }
        //set the cart
        setCart(savedCart)
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); 
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }


    const handelClearCart = () =>{
        setCart([]);
        deleteShoppingCart()
      }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                handelClearCart={handelClearCart} cart={cart} key={cart.key}>
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proced' >Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;