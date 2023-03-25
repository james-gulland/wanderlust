import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import Home from './components/Home'
import DestinationIndex from './components/destination/DestinationIndex'

const App = () => {

  // useEffect(() => {
    
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/')
  //     console.log('This is the data', data)
  //   }
  //   getData()

  // })

  return (
    <div id="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<DestinationIndex />} />
          {/* <Route path="/'/destinations/:id/" element={<DestinationSingle />} />
          <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
