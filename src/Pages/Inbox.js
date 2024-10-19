import React, { useContext, useState } from 'react'
import { Email } from './Email'
import { EmailContext } from '../Context/EmailContext'
import { Dates } from './Date'

export const Inbox = () => {

  const {setPage, page, markRead, filterEmail, filter, readEmails, favourite} = useContext(EmailContext)
  const [selectedMail, setSelectedMail] = useState()

  return (
    <div style={{display: selectedMail ? "flex" : "", gap:"2rem"}} >
                                                        
      <div>                                       
      { filterEmail.length > 0 ?
        filterEmail.map((message) => {
          const {id, from, date, subject, short_description} = message;
        return (

        <div onClick={() => { setSelectedMail(message); markRead(message)}} 
        style={{background: readEmails.find((mails) => mails.id === id) ? "#F2F2F2" : "white" }}
        className='flex gap-2 text-left border-2 my-2 p-1 rounded-lg bg-white text-gray-500 cursor-pointer' key={id}>

         <p className='bg-[#E54065] text-center text-white m-2 text-xl w-7 h-min rounded-full' > 
          {from.name.slice(0,1).toUpperCase() } </p>

         <div className='text-sm' >
          <p>From: <span className='text-gray-600 font-medium'>{from.name} {"<"}{from.email}{">"}</span> </p>
          <p>Subject: <span className='text-gray-600 font-medium' >{subject}</span></p>
          <p className='w-[22rem] truncate' >{short_description}</p>
          <p className='flex'><Dates dates={date} />
            <span className='text-[#E54065] font-medium mx-4' >{favourite.find((email) => email.id === id) ? 'Favourite' : ''}</span>
          </p>
          </div>
        </div>  )})
        :
        <h1 className='w-[30rem] text-center text-2xl font-medium my-2' >No Emails</h1>
      }

      { filter === 'Inbox' ? 
      <>
      {page>1 && <button className='w-fit py-1 px-2 bg-stone-700 text-white rounded-full' onClick={() => setPage(1)}>Previous Page</button>}
      {page===1 && <button className='w-fit py-1 px-2 bg-stone-700 text-white rounded-full' onClick={() => setPage(2)}>Next Page</button>}
      </> : ""} 

      </div>
     {selectedMail && <Email selectedMail={selectedMail} />}
      </div>
  )
}