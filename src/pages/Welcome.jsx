import React from 'react'
import { NavLink } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Sales Savvy</h1>
      <NavLink to={'/signIn'}>SignIn</NavLink>
      <NavLink to={'/signUp'}>SignUp</NavLink>
    </div>
  )
}

export default Welcome