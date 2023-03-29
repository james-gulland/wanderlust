import { useState, useRef, useEffect } from 'react'
import React from 'react'
import Nav from './common/Nav'
import Dialog from './common/Dialog'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {

  // ! State
  // State for the Modal to either show or not show
  const modalRef = useRef(null)

  // State for the Form Fields
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [destinations, setDestinations] = useState([])
  const [filteredDestinations, setFilteredDestinations] = useState([])
  const [temperature, setTemperature] = useState('0')
  const [image, setImage] = useState(0)
  const [previousDisabled, setPreviousDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)

  // ! On Mount
  useEffect(() => {
    // This function will get our bread data and save it to the bread state
    const getDestinations = async () => {
      try {
        const { data } = await axios.get('/api/')
        setDestinations(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getDestinations()
    // handleFilter()
    // applyFilter()
  }, [])

  // ! Executions
  const handleLogin = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/', formFields)
      // Save the token to local storage for later use
      localStorage.setItem('WANDERLUST-TOKEN', data.token)
      closeModal()
      navigate('/') // need this to trigger the 'logout' button to show
    } catch (err) {
      console.log('error', err)
      setError(err.response.data.message)
    }
  }

  function openModal() {
    modalRef.current.showModal()
  }

  function closeModal() {
    modalRef.current.close()
  }

  const handleFilter = (value) => {
    console.log(value)
    setImage(0)
    setTemperature(value)
  }

  const applyFilter = () => {
    if (destinations.length > 0) {
      const currentMonth = new Date().getMonth()
      let minTemp
      let maxTemp
      if (temperature === '0') {
        minTemp = Math.min(...destinations.map(destination => destination.highTemps[currentMonth]))
        maxTemp = 10
      } else if (temperature === '1') {
        minTemp = 11
        maxTemp = 19
      } else if (temperature === '2') {
        minTemp = 20
        maxTemp = 29
      } else {
        minTemp = 30
        maxTemp = Math.max(...destinations.map(destination => destination.highTemps[currentMonth]))
      }
      const temp = destinations.filter(destination => {
        return minTemp <= destination.highTemps[currentMonth] && destination.highTemps[currentMonth] <= maxTemp
      })
      setFilteredDestinations(temp)
      console.log('minTemp =', minTemp)
      console.log('maxTemp =', maxTemp)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [destinations, temperature])

  useEffect(() => {
    console.log('FILTERED DESTINATIONS', filteredDestinations)
  }, [filteredDestinations])

  const handleImageChange = (value) => {
    setImage(image + parseInt(value))
  }

  const disableButtons = () => {
    if (image === 0) {
      setPreviousDisabled(true)
    } else setPreviousDisabled(false)
    if (image >= filteredDestinations.length - 1) {
      setNextDisabled(true)
    } else setNextDisabled(false)
  }

  useEffect(() => {
    disableButtons()
    console.log(image)
  }, [filteredDestinations, image])

  return (
    <>
      <Nav openModal={openModal} />
      <main>
        <Dialog modalRef={modalRef} closeModal={closeModal} handleLogin={handleLogin} handleSubmit={handleSubmit} formFields={formFields} />
        {/* <!-- BUTTONS (input/labels) --> */}
        <input type="radio" name="slider" id="slide-1-trigger" className="trigger" value="0" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-1-trigger"></label>
        <input type="radio" name="slider" id="slide-2-trigger" className="trigger" value="1" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-2-trigger"></label>
        <input type="radio" name="slider" id="slide-3-trigger" className="trigger" value="2" onChange={(e) => handleFilter(e.target.value)} defaultChecked />
        <label className="btn" htmlFor="slide-3-trigger"></label>
        <input type="radio" name="slider" id="slide-4-trigger" className="trigger" value="3" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-4-trigger"></label>
        <div className="emoji" id="emoji-cold">❄️</div>
        <div className="emoji" id="emoji-mild">⛅️</div>
        <div className="emoji" id="emoji-warm">☀️</div>
        <div className="emoji" id="emoji-hot">🔥</div>

        {/* <!-- SLIDES --> */}
        <div className="slide-wrapper">
          <div className="homepage-heading">
            <h1>Explore the world with wander</h1>
            <h2>Need to get away? Choose your weather mood and lets go travelling!</h2>
          </div>
          <div id="slide-role">
            {filteredDestinations.length > 0 ?
              <>
                <div className="slide slide-1" style={{ backgroundImage: `url("${filteredDestinations[image].images[0]}")` }}></div>
                <div className="slide slide-2" style={{ backgroundImage: `url("${filteredDestinations[image].images[1]}")` }}></div>
                <div className="slide slide-3" style={{ backgroundImage: `url("${filteredDestinations[image].images[2]}")` }}></div>
                <div className="slide slide-4" style={{ backgroundImage: `url("${filteredDestinations[image].images[3]}")` }}></div>
              </>
              :
              console.log('error - filtered destinations')
            }
          </div>
          <div id="prev-next-controls">
            <button id="btn-previous" className="prev-next" value='-1' onClick={(e) => handleImageChange(e.target.value)} disabled={previousDisabled}>&#60;</button>
            <button id="btn-next" className="prev-next" value='1' onClick={(e) => handleImageChange(e.target.value)} disabled={nextDisabled}>&#62;</button>
          </div>
          <div id="explore">
            {/* <div>
              <input type="range" min="0" max="3" defaultValue="2" className="slide range-style trigger" onChange={(e) => handleFilter(e.target.value)}></input>
            </div> */}
            {/* <button id="btn-previous" value='-1' onClick={(e) => handleImageChange(e.target.value)} disabled={previousDisabled}>previous</button> */}
            {/* <div id="radio-container">
              <div>
                <input type="radio" name="slider" id="slide-1-trigger" className="trigger" value="0" onChange={(e) => handleFilter(e.target.value)} />
                <label className="btn" htmlFor="slide-1-trigger"></label></div>
              <div>
                <input type="radio" name="slider" id="slide-2-trigger" className="trigger" value="1" onChange={(e) => handleFilter(e.target.value)} />
                <label className="btn" htmlFor="slide-2-trigger"></label>
              </div>
              <div>
                <input type="radio" name="slider" id="slide-3-trigger" className="trigger" value="2" onChange={(e) => handleFilter(e.target.value)} defaultChecked/>
                <label className="btn" htmlFor="slide-3-trigger"></label>
              </div>
              <div>
                <input type="radio" name="slider" id="slide-4-trigger" className="trigger" value="3" onChange={(e) => handleFilter(e.target.value)} />
                <label className="btn" htmlFor="slide-4-trigger"></label>
              </div>
            </div> */}
            <div id="explore-button-container">
              <Link to='/destinations' state={{ filtered: filteredDestinations, unfiltered: destinations, temperature: temperature }}>
                <button id="btn-explore" >Explore!</button>
              </Link>
              {/* <button id="btn-next" value='1' onClick={(e) => handleImageChange(e.target.value)} disabled={nextDisabled}>next</button> */}
            </div>
          </div>
        </div>
      </main>
    </>
  )

}

export default Home