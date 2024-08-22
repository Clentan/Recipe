import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const pagenav = () => {
  return (
    <nav>
        <Logo/>
        <ul className='pagenav_ul'>
          <li className='pagenav_list'>
            <NavLink to='/'>Home</NavLink>
           </li>
            <li>
            <NavLink to='/Login'>Login</NavLink>
             </li>
             <li>
            <NavLink to='/Registration'>Register</NavLink>
              </li>
               <li>
            <NavLink to='*'></NavLink>
        </li>
        </ul>
    </nav>
  )
}

export default pagenav
