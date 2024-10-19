import React, { useContext, useEffect, useState } from 'react'
import { EmailContext } from '../Context/EmailContext'
import { Dates } from './Date'

export const Email = ({selectedMail}) => {
    const {addToFavourite, favourite, removeFavourite} = useContext(EmailContext)
    const [emailBody, setEmailBody] = useState('')

    useEffect(() => {
     FetchData()
    }, [emailBody])
    
    const FetchData = async() => {
     const response = await fetch(`https://flipkart-email-mock.vercel.app/?id=${selectedMail.id}`);
     const data = await response.json();
     setEmailBody(data)
    }
   
  return (
    <div className='border-2 h-fit w-2/3 flex p-4 my-2 text-left bg-white rounded-xl text-gray-500'>
         <p className='bg-[#E54065] text-center text-white m-3 px-3 py-1 text-2xl h-min rounded-full' > 
          {selectedMail.from.name.slice(0,1).toUpperCase() } </p>
            <div className='text-sm' >

             <span className='flex justify-between items-baseline'>
             <p className='text-2xl mt-2 font-medium' > {selectedMail.subject} </p>
             {favourite.find((email) => email.id === selectedMail.id) ? 
             <button onClick={() => removeFavourite(selectedMail.id)} className='bg-[#E54065] text-center text-white px-2 py-1 rounded-xl' >Remove from favourites</button> : 
             <button onClick={() => addToFavourite(selectedMail)} className='bg-[#E54065] text-center text-white px-2 py-1 rounded-xl' >Mark as favourite</button> }
             </span>
             <p className='my-5'><Dates dates={selectedMail.date} /></p>
             
             <p>{selectedMail.short_description}</p>
             <br />
             <div dangerouslySetInnerHTML={{ __html: emailBody.body }} ></div>
            </div>
    </div>
  )
}
