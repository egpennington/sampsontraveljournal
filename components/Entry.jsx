import { useState, useRef, useEffect } from "react"

export default function Entry(props) {

  // const [likes, setLikes] = useState(12)
  const entryRef = useRef(null)
  const audioRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)

  const entryId = props.post.id;
  const localStorageKey = `sampson_likes_${entryId}`;

  const [likes, setLikes] = useState(() => {
    const stored = localStorage.getItem(localStorageKey);
    return stored ? parseInt(stored) : 12;
  });

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(localStorageKey, newLikes);
  };

  useEffect(() => {
    if (props.post.id !== "17") return

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
  }, [props.post.id])

  const handleManualPlay = () => {
    audioRef.current?.play()
    setShowPlayButton(false)
  }

  return (
    <article
      id={`entry-${props.post.id}`}
      className={props.post.id === "17" && isVisible ? "entry fade-in" : "entry"}
      ref={props.post.id === "17" ? entryRef : null}
    >
      <div className="location-img-container">
        <img src={props.post.img.src} className="location-img" />
      </div>

      <div className="location-card">
        <img src="./images/marker.png" className="location-marker" alt="map marker icon" />
        <span className="location-place">{props.post.country}</span>
        <a href={props.post.googleMapsLink} target="_blank">View on Google Maps</a>
        <h2 className="location-title">{props.post.title}</h2>
        <p className="location-date">{props.post.date}</p>
        <p className="location-text">{props.post.text}</p>

        <div className="buttonDiv">
          {props.post.id !== "17" && (
            <button
              className="scroll-down-arrow"
              onClick={() => {
                const next = document.getElementById(`entry-${parseInt(props.post.id) + 1}`);
                if (next) next.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Scroll to next entry"
            >
              <i className="fa-solid fa-angles-down"></i>
            </button>
          )}

          <button className="likeBtn" onClick={handleLike}>
            ❤️ {likes}
          </button>
        </div>  

        {props.post.id === "17" && (
          <>
            <audio ref={audioRef} src="/music/LeanOnMe.mp3" />
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
