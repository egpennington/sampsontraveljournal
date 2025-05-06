import { useState, useRef, useEffect } from "react"

export default function Entry(props) {
  const [likes, setLikes] = useState(0)
  const entryRef = useRef(null)
  const audioRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)

  useEffect(() => {
    if (props.id !== "17") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const playPromise = audioRef.current?.play()
          if (playPromise) {
            playPromise.catch(() => {
              setShowPlayButton(true) // 🔁 fallback
              console.log("Autoplay blocked by browser. Show play button.")
            })
          }
        }
      },
      { threshold: 0.5 }
    )

    if (entryRef.current) observer.observe(entryRef.current)

    return () => {
      if (entryRef.current) observer.unobserve(entryRef.current)
    }
  }, [props.id])

  const handleManualPlay = () => {
    audioRef.current?.play()
    setShowPlayButton(false)
  }

  return (
    <article
      className={props.id === "17" && isVisible ? "entry fade-in" : "entry"}
      ref={props.id === "17" ? entryRef : null}
    >
      <div className="location-img-container">
        <img src={props.img.src} className="location-img" />
      </div>

      <div className="location-card">
        <img src="./images/marker.png" className="location-marker" alt="map marker icon" />
        <span className="location-place">{props.country}</span>
        <a href={props.googleMap} target="_blank">View on Google Maps</a>
        <h2 className="location-title">{props.title}</h2>
        <p className="location-date">{props.date}</p>
        <p className="location-text">{props.text}</p>

        <button className="likeBtn" onClick={() => setLikes(likes + 1)}>
          ❤️ {likes}
        </button>        

        {props.id === "17" && (
          <>
            <audio ref={audioRef} src="src/assets/music/LeanOnMe.mp3" />
            {showPlayButton && (
              <button className="audio-btn fade-audio-btn" onClick={handleManualPlay}>
                🎵 Play Sampson’s Song
              </button>
            )}
          </>
        )}
      </div>
    </article>
  )
}
