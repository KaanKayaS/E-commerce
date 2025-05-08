import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/ProductSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addtoBasket, calculateBasket } from '../redux/slices/basketSlice';



function ProductDetail() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description } = selectedProduct;

    const[count , setCount] = useState(0);

    const increment = ()=>{
         setCount(count+1);
    }

    const decrement = ()=>{
        setCount(count-1);
   }

   const addBasket = ()=>{
    const payload ={
        id,
        price,
        image,
        title,
        description,
        count
    }

    dispatch(addtoBasket(payload))
    dispatch(calculateBasket());
   }

  


    const dispatch = useDispatch();

    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product))
            }
        })
    }

    return (
        <div style={{ marginTop: '30px', display:'flex', flexDirection:'row',justifyContent:'center' }}>
            <div style={{marginRight:'45px'}}>
                <img src={image} width={300} height={500} />
            </div>
            <div>
                 <h1 style={{fontFamily:'arial'}}>{title}</h1>
                 <p style={{fontFamily:'arial'}}>{description}</p>
                 <h1>{price} ₺</h1>

                 <div style={{display:'flex', alignItems:'center'}}>
                    <CiCirclePlus onClick={increment} style={{fontSize:'40px', marginRight:'15px'}}/> <span style={{fontSize:'25px'}}>{count}</span> 
                    <CiCircleMinus onClick={decrement} style={{fontSize:'40px', marginLeft:'15px'}}/>  
                 </div>

                 <div>
                    <button onClick={addBasket}
                    style={{marginTop:'25px',border:'none',padding:'10px',backgroundColor:'ButtonFace',borderRadius:'5px'}}>Sepete Ekle</button>
                 </div>
            </div>
        </div>
    )
}

export default ProductDetail