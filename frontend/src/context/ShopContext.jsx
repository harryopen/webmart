import { createContext, useState } from "react";
import allProduct from '../components/Assets/all_product';
import all_product from "../components/Assets/all_product";
export const ShopContext = createContext(null);


const getDefaultCart=()=>{
    let cart = {};
    for(let index = 0  ;index< all_product.length +1 ; index ++){
        cart[index] = 0;
    }
    return cart
}


const ShopContextProvider =(props)=>{
   
    function addtocart(itemid){

        setCartItem((prev)=>({...prev,[itemid]:prev[itemid]+1}))
        setCount(count +1);
       }
       
       function removetocart(itemid){
       
           setCartItem((prev)=>({...prev,[itemid]:prev[itemid]- 1}))
           setCount(count-1)
          }
         
    
    const[cartItems,setCartItem] = useState(getDefaultCart());
    const[count,setCount]= useState(0);
   
    
    const getTotalcart=()=>{
        let total = 0;
        for(let index = 0  ;index< all_product.length +1 ; index ++){
            if(cartItems[index]>0){
                let iteminfo = all_product.find((product)=>product.id == Number(index))
                total += cartItems[index]*iteminfo.new_price;
            }
        } 
        return total;  
      }
      const contextValue = {getTotalcart,count,allProduct,cartItems,addtocart,removetocart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
            </ShopContext.Provider>
    )

}
export default ShopContextProvider;