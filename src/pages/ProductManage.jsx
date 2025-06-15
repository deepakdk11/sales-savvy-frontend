import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductManage = () => {
  return (
    <div>
        <h1>Product Management</h1>
        <NavLink to={'/addProd'}>Add Products</NavLink>
        <NavLink to={'/updateProd'}>Update Products</NavLink>
        <NavLink to={'/deleteProd'}>Delete Products</NavLink>
        <NavLink to={'/searchProd'}>Search Products</NavLink>
    </div>
  )
}

export default ProductManage