import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div>
      <NavLink to={'/pm'}>Product Management</NavLink>
      <NavLink to={'/um'}>User Management</NavLink>
    </div>
  )
}

export default AdminHome