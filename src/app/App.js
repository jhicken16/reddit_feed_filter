import Nav from '../utilities/nav/Nav'
import SubscribedList from '../subscibed_list/SubscribedList';
import Feed from '../feed/Feed';

import { useState } from 'react';

function App() {

  const [filter, setFilter] = useState([])
  console.log(filter)

  const filterHandler = (item) => {
    setFilter((prev) => [...prev, item])
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
