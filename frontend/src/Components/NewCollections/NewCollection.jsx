import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import { Item } from '../Item/Item'


export const NewCollection = () => {

  const [new_collection,setNew_collection] = useState([]); 

  useEffect(()=>{
  fetch('http://localhost:4000/newcollections')
  .then((response)=>response.json())
  .then((data)=>setNew_collection(data));
  },[])
  return (
    <div className='new-collections'>
        <h1>New Collection</h1>
        <hr/>
        <div className='collection'>
            {new_collection.map((item,i)=>{
                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
