import React, { useState} from 'react'
import '../css/Header.css'
import { LuShoppingBasket } from "react-icons/lu";
import { MdOutlineLightMode } from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';



function Header() {
    const [theme , setTheme] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products} = useSelector((store) => store.basket)

    const changeTheme = ()=>{
         const root = document.getElementById("root");

         setTheme(!theme);
         if(theme){
            root.style.backgroundColor="black";
            root.style.color ="#fff";
         }
         else{
            root.style.backgroundColor="#fff";
            root.style.color ="black";
         }
    }

  return (
    <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <div className='flex-row'>
            <img className='logo' onClick={()=> navigate("/")} src="./src/images/logo.jpg"/>
            <p className='logo-text'>KAAN TİCARET</p>
        </div>

        <div className='flex-row'>
            <input className='search-input' type='text' placeholder='Bir şeyler ara..'/>
            <div>
            {theme ? <FiMoon className='icon'  onClick={changeTheme}/> : <MdOutlineLightMode className='icon' onClick={changeTheme}/>}  
            <Badge onClick = {()=> dispatch(setDrawer())} badgeContent={products.length} color="primary">
            <LuShoppingBasket className='icon'/>
            </Badge>

                      
            </div>

        </div>
    </div>
  )
}

export default Header