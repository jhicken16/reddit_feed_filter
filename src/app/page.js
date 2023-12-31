import SubscribedList from '../subscibed_list/SubscribedList';
import Feed from '../feed/Feed';
import { useState } from 'react';

//reddit redirects back to this page need to check state that is return matches state that we sent. 
//Sate sent wipes due to page re-rendering on redirect save to local storage?


function Page() {

  const [filter, setFilter] = useState([])
    
  //function that hendles state with elements from array that are to be REMOVED from selector.
  const filterHandler = (item) => {
    setFilter((prev) => {
      if(prev.includes(item)){
        return prev.filter((x) => item !== x)
      }
      return [...prev, item]
    })
  }

  return (

    <>
    <SubscribedList filterHandler={filterHandler}/>
    <Feed filter={filter}/>
    </>
    
  );

}

export default Page;