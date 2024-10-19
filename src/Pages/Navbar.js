import React, { useContext } from 'react'
import { EmailContext } from '../Context/EmailContext'

export const Navbar = () => {
  const navArray = ["Inbox", "Unread", "Read", "Favourites"]
  const {filter, setFilter, setFilteredMail} = useContext(EmailContext);

  return (
    <div className='flex gap-4 my-4' >
     Filter By:
     { navArray.map((navs) => 
     <p key={navs} 
     style={{backgroundColor: filter === navs ? "#E1E4Ea" : "",border:  filter === navs ? "1px solid #CFD2DC" : "", padding: "0rem .4rem", borderRadius: "1rem", cursor: "pointer"}} 
     onClick={() => {setFilteredMail(navs); setFilter(navs)}} >{navs}</p> ) }
    </div>
  )
}
