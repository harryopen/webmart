import React, { useContext, useState } from 'react'
import logo from "../Assets/logo.png";
import cart_icon from '../Assets/cart_icon.png';
import {Link} from 'react-router-dom';


import { ShopContext } from '../../context/ShopContext';

function Navbar() {
    const[nav,setNav] =useState("shop");
    const {getTotalCartItems}=useContext(ShopContext);
  return (
    <div className='flex justify-around p-4 '>
        <div className='logo flex items-center gap-3'>
            <img src={logo}></img>
            <p className=''>Shopper</p>
        </div>
        <ul className='flex items-center gap-5 cursor-pointer '>
           <li onClick={()=>{setNav("shop")}}><Link to ='/'>Shop</Link> {nav==="shop"?<hr className='h-1 ronded  w-6 bg-red-700 '/>:<></>}</li>
           <li onClick={()=>{setNav("men")}}> <Link to ='/mens'>Men</Link> {nav==="men"?<hr className='h-1 ronded  w-5 bg-red-700 '/>:<></>}</li>
           <li onClick={()=>{setNav("women")}}><Link to ='/women'>women</Link> {nav==="women"?<hr className='h-1 ronded  w-10 bg-red-700 '/>:<></>}</li>
           <li onClick={()=>{setNav("kids")}}> <Link to ='/kids'>kids</Link> {nav==="kids"?<hr className='h-1 ronded  w-5 bg-red-700 '/>:<></>} </li>
        </ul>
        <div className='flex items-center p-5 gap-5 '>
          {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token')
            window.location.replace('/')
          }}>logout</button>: <Link to  ='/login'><button className='border p-1 rounded-lg active:text-red-500'> Login</button></Link>}

            <Link to ='/cart'><img src={cart_icon}/></Link>
            <div className='p-1 h-8  rounded-lg w-5 mt-[-45px] ml-[-30px] text-white bg-red-700'>{getTotalCartItems()}</div>
        </div>

    </div>
  )
}

export default Navbar
