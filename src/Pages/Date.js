
export const Dates = ({dates}) => {

   const timestamp = dates;
   const date = new Date(timestamp);

   const day = String(date.getDate()).padStart(2, '0');
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const year = date.getFullYear();
   let hours = date.getHours();
   const minutes = String(date.getMinutes()).padStart(2, '0');

   const ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours % 12;
   hours = hours ? String(hours).padStart(2, '0') : '12';

   const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;

  return (
    <p> {formattedDate} </p>
  )
}
