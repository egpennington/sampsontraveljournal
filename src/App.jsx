import { useState } from 'react'
import Header from "/components/Header"
import Entry from "/components/Entry"
import travelData from "./travelData"
import Footer from "../components/Footer"
import ScrollNav from '../components/ScrollNav'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  const handleStart = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return (
      <div className="splash-screen" onClick={handleStart}>
        <img src="/images/splashPage2.png" alt="Sampson's Travel Journal" className="splash-image" />
      </div>
    )
  }

  const travelElements = travelData.map((post) => (
    <Entry 
      key={post.id}
      post={post}
    />
  ))
  
  return (
    <> 
      <Header />
      <ScrollNav />
      {travelElements}
      <Footer />
    </>
  )
}
