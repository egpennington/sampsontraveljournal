import React, { useState } from 'react'
import MainApp from './App'

export default function SplashPage() {
  const [showSplash, setShowSplash] = useState(true)

  const handleStart = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash ? (
        <div className="splash-screen">
          <img
            src="./images/sampson-splash.png"
            alt="Sampson's Travel Journal Splash"
            className="splash-image"
          />
          <button className="start-button" onClick={handleStart}>
            Start Journal
          </button>
        </div>
      ) : (
        <MainApp />
      )}
    </>
  )
}
