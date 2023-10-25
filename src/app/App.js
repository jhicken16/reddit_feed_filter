import Nav from '../utilities/nav/Nav'
import SubscribedList from '../subscibed_list/SubscribedList';
import Feed from '../feed/Feed';

import { useState } from 'react';

function App() {

  const [filter, setFilter] = useState([])
  console.log(filter)

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
    <Nav />
    <SubscribedList filterHandler={filterHandler}/>
    <Feed filter={filter}/>
    </>
    
  );

}

export default App;
