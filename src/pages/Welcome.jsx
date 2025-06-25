import React from 'react'
import { NavLink } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      <section>
  {/* simple text-logo */}
  <h1>
    Sales <span>Savvy</span>
  </h1>

  {/* one-liner + elevator pitch */}
  <p>
    Shop smarter, not harder. Sales&nbsp;Savvy brings hand-picked deals,
    lightning-fast delivery and a personalised cart—all in one place.
    Sign up free and start exploring today!
  </p>

  {/* big call-to-action blocks */}
  <div>
    <NavLink to="/signup">
      <span>Create account</span>
    </NavLink>

    <NavLink to="/signin">
      <span>Sign&nbsp;in</span>
    </NavLink>
  </div>
</section>

    </div>
  )
}

export default Welcome