import { createContext, useEffect, useState } from "react";

export const EmailContext = createContext()

export const EmailProvider = ({children}) => {
    const [emails, setEmails] = useState([])
    const [page, setPage] = useState(1)
    const [favourite, setFavourite] = useState([])
    const [readEmails, setReadEmails] = useState([])
    const [filter, setFilter ] = useState('Inbox')
    const [filterEmail, setFilterEmail] = useState([])
  
    useEffect(() => {
     FetchData();
      }, [page])
  
    const FetchData = async() => {
     const response = await fetch(`https://flipkart-email-mock.vercel.app/?page=${page}`);
     const data = await response.json();
     setEmails(data.list)
     setFilterEmail(data.list)
    }

    const addToFavourite = (item) => {
     const findEmail = favourite.find((email) => email.id === item.id)

     findEmail ? setFavourite([...favourite]) : setFavourite([...favourite,item]) 
    }
    const removeFavourite = (itemId) => {
      setFavourite(favourite.filter((email) => email.id !== itemId))
    }

    const markRead = (item) => {
      const findEmail = readEmails.find((email) => email.id === item.id)

      findEmail ? setReadEmails([...readEmails]) : setReadEmails([...readEmails, item])
    }

    const unreadEmails = emails.filter(({id}) => !readEmails.map(({id}) => id).includes(id));
    
    const setFilteredMail = (filter) => {
      if( filter === 'Inbox' || filter === 'Unread'){
        filter === "Inbox" ? setFilterEmail(emails) : setFilterEmail(unreadEmails)
      }
      else{
        filter === "Read" ? setFilterEmail(readEmails) : setFilterEmail(favourite)
      }
    }

    return(
        <EmailContext.Provider 
        value={{emails, setPage, page, addToFavourite, favourite, removeFavourite, setFilter, filter, markRead,readEmails, setFilteredMail, filterEmail}} >
            {children}
        </EmailContext.Provider>
    )
}