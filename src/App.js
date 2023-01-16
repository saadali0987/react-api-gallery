
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';




function App() {
  const [searchValue, setSearchValue] = useState("")
  const [apiData, setApiData] = useState([])
  const [randomPics, setRandomPics] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  let searchRequest = `https://api.unsplash.com/search/photos?client_id=dA3rUfPMaVyWBGVmAdcbwHKBrbhzvobpZUcm_udsofg&query=${searchValue}&page=${pageNumber}&per_page=30`

  const randomPictureRequest = `https://api.unsplash.com/search/photos?client_id=dA3rUfPMaVyWBGVmAdcbwHKBrbhzvobpZUcm_udsofg&query=nature&per_page=27`

  async function getMoreData(){
    let response = await fetch(searchRequest)
    let data = await response.json()
    console.log(data.results)
    setApiData(data.results)
  }

    function changePage(){
    setPageNumber(pageNumber + 1)
  }

  async function getRandomPictures(){
    let response = await fetch(randomPictureRequest)
    let data = await response.json()
    console.log(data.results)
    setRandomPics(data.results)
  }

  useEffect(()=>{
    if(apiData.length == 0){
      getRandomPictures()
    }else{
      getMoreData()
    }
    
  }, [pageNumber])

  function handleSearchInputChange(e){
    setSearchValue(e.target.value)
  }
  
  async function fetchData(e){
    e.preventDefault()
    let response = await fetch(searchRequest)
    let data = await response.json()
    console.log(data.results)
    setApiData(data.results)
  }

  function clearGallery(){
    setSearchValue("")
    setApiData([])
  }



  return (
    <div className="App">

      {/* <div className='search'>
        <span onClick={clearGallery}>Infinity-Media:</span>
        <input type="text" value={searchValue} onChange={handleSearchInputChange}></input>
        <button onClick={fetchData}>Search</button>
      </div> */}

      <form onSubmit={fetchData} className='search'>
        <span onClick={clearGallery}>Infinity-Media:</span>
        
          <input type="text" value={searchValue} onChange={handleSearchInputChange}></input>
  
        
        <button type='submit'>Search</button>
      </form>

      <div className='container'>
        {apiData.length != 0 ? apiData.map((data)=>(
          <div key={data.id} className='image'>
            <img src={data.urls.small}></img>
          </div>
        )): randomPics.map((data)=>(
          <div key={data.id} className='image'>
            <img src={data.urls.small} alt={data.alt_description}></img>
          </div>
        ))
        }


        {/* {apiData?.map((data)=>(
          <div className='image'>
            <img src={data.urls.small}></img>
          </div>
        ))} */}
      </div>
      
      {apiData.length != 0 && <div className='pagination'>
        <button className='control prev' onClick={changePage}>previous</button>
        <button className='control next' onClick={changePage}>next</button>
      </div> }
      
      

      <footer>
        Created By developerSaad   |   All Rights Reserved
      </footer>
      
    </div>
  );
}

export default App;
