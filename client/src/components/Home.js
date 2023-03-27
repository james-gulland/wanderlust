import { useState, useRef, useEffect } from 'react'
import React from 'react'
import Nav from './common/Nav'
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
  const [temperature, setTemperature] = useState('cold')
  const [slide1Image, setSlide1Image] = useState(0)
  const [slide2Image, setSlide2Image] = useState(0)
  const [slide3Image, setSlide3Image] = useState(0)
  const [slide4Image, setSlide4Image] = useState(0)
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
  }, [])

  // ! Executions
  const handleChange = (e) => {
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
    setTemperature(value)
  }

  const applyFilter = () => {
    if (destinations.length > 0) {
      const currentMonth = new Date().getMonth()
      let minTemp
      let maxTemp
      if (temperature === 'cold') {
        minTemp = Math.min(...destinations.map(destination => destination.highTemps[currentMonth]))
        maxTemp = 10
      } else if (temperature === 'mild') {
        minTemp = 11
        maxTemp = 19
      } else if (temperature === 'warm') {
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
    if (temperature === 'cold') {
      setSlide1Image(slide1Image + parseInt(value))
    } else if (temperature === 'mild') {
      setSlide2Image(slide2Image + parseInt(value))
    } else if (temperature === 'warm') {
      setSlide3Image(slide3Image + parseInt(value))
    } else {
      setSlide4Image(slide4Image + parseInt(value))
    }
  }

  const disableButtons = () => {
    if ((temperature === 'cold' && slide1Image === 0) || (temperature === 'mild' && slide2Image === 0) || (temperature === 'warm' && slide3Image === 0) || (temperature === 'hot' && slide4Image === 0)) {
      setPreviousDisabled(true)
    } else setPreviousDisabled(false)
    if ((temperature === 'cold' && slide1Image >= filteredDestinations.length - 1) || (temperature === 'mild' && slide2Image >= filteredDestinations.length - 1) || (temperature === 'warm' && slide3Image >= filteredDestinations.length - 1) || (temperature === 'hot' && slide4Image >= filteredDestinations.length - 1)) {
      setNextDisabled(true)
    } else setNextDisabled(false)
  }

  useEffect(() => {
    console.log('slide1Image', slide1Image)
    console.log('slide1Image', slide2Image)
    console.log('slide1Image', slide3Image)
    console.log('slide1Image', slide4Image)
    disableButtons()
  }, [filteredDestinations, slide1Image, slide2Image, slide3Image, slide4Image])


  return (
    <>
      <Nav openModal={openModal} />

      <main>
        {/* <!-- BUTTONS (input/labels) --> */}
        <input type="radio" name="slider" id="slide-1-trigger" className="trigger" value="cold" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-1-trigger"></label>
        <input type="radio" name="slider" id="slide-2-trigger" className="trigger" value="mild" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-2-trigger"></label>
        <input type="radio" name="slider" id="slide-3-trigger" className="trigger" value="warm" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-3-trigger"></label>
        <input type="radio" name="slider" id="slide-4-trigger" className="trigger" value="hot" onChange={(e) => handleFilter(e.target.value)} />
        <label className="btn" htmlFor="slide-4-trigger"></label>

        {/* <!-- SLIDES --> */}
        <div className="slide-wrapper">
          <div id="slide-role">
            {filteredDestinations.length > 0 ?
              <>
                <div className="slide slide-1" style={{ backgroundImage: `url(${filteredDestinations[slide1Image].images[0]})` }}></div>
                <div className="slide slide-2" style={{ backgroundImage: `url(${filteredDestinations[slide2Image].images[1]})` }}></div>
                <div className="slide slide-3" style={{ backgroundImage: `url(${filteredDestinations[slide3Image].images[2]})` }}></div>
                <div className="slide slide-4" style={{ backgroundImage: `url(${filteredDestinations[slide4Image].images[3]})` }}></div>
              </>
              :
              console.log('error - filtered destinations')
            }
            {/* <div className="slide slide-1" style={{ backgroundImage: 'url("https://images.pexels.com/photos/448714/pexels-photo-448714.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600")' }}></div> */}
          </div>
          <div id="explore">
            <button id="btn-explore" value='-1' onClick={(e) => handleImageChange(e.target.value)} disabled={previousDisabled}>previous</button>
            <Link to='/destinations' state={{ filtered: filteredDestinations, unfiltered: destinations }}>
              <button id="btn-explore" >Explore!</button>
            </Link>
            <button id="btn-explore" value='1' onClick={(e) => handleImageChange(e.target.value)} disabled={nextDisabled}>next</button>
          </div>
        </div>

        {/* <!-- LOGIN MODAL --> */}
        <dialog className="modal" id="modal" ref={modalRef}>
          <h2>Log into Wanderlust</h2>
          <button className="close-button" onClick={closeModal}>X</button>
          <form className="form" method="dialog" onSubmit={handleSubmit}>
            <label>Email:<input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} /></label>
            <label>Password:<input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} /></label>
            <button className="button" type="submit">Submit form</button>
            {error && <p className='text-danger'>{error}</p>}
          </form>
        </dialog>
      </main>
    </>
  )

}

export default Home