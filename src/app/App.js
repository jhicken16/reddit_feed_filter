import Nav from '../utilities/nav/Nav'
import SubscribedList from '../subscibed_list/SubscribedList';
import Feed from '../feed/Feed';

import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectSubscribed } from '../subscibed_list/subscribeSlice';

function App() {

  const [filter, setFilter] = useState(useSelector(selectSubscribed))

  const filterHandler = (item) => {
    setFilter((prev) => prev.filter((value) => value !== item))
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
