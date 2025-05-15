import { useState, useRef, useEffect } from "react"
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../src/firebase"

export default function Entry(props) {

  // const [likes, setLikes] = useState(12)
  const entryRef = useRef(null)
  const audioRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)

  const entryId = props.post.id.toString();
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const docRef = doc(db, "likes", entryId); // ✅ define this inside the function
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLikes(docSnap.data().count || 0);
        } else {
          // If no likes doc exists, create it with initial count 12
          await setDoc(docRef, { count: 12 });
          setLikes(12);
        }
      } catch (error) {
        console.error("Error fetching or creating Firestore likes:", error);
      }
    };

    fetchLikes();
}, [entryId]);


  const handleLike = async () => {
    try {
      const docRef = doc(db, "likes", entryId);
      await updateDoc(docRef, {
        count: increment(1)
      });
      setLikes((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating Firestore like count:", error);
    }
  };

  useEffect(() => {
    if (props.post.id !== "27") return

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
      className={props.post.id === "27" && isVisible ? "entry fade-in" : "entry"}
      ref={props.post.id === "27" ? entryRef : null}
    >
      <div className="location-img-container">
        <img src={props.post.img.src} className="location-img" />
      </div>

      <div className="location-card">
        <img src="./images/marker.png" className="location-marker" alt="map marker icon" />
        <span className="location-place">{props.post.country}</span>
        <a href={props.post.googleMapsLink} target="_blank">View on Google Maps</a>
        <h2 className="location-title">{props.post.title}</h2>
        <p className="location-date">{props.post.dates}</p>
        <p className="location-text">{props.post.text}</p>

        <div className="buttonDiv">
          <button className="likeBtn" onClick={handleLike}>
            ❤️ {likes}
          </button>

          <button
            className="scroll-up-arrow"
            onClick={() => {
              const prev = document.getElementById(`entry-${parseInt(props.post.id) - 1}`);
              if (prev) prev.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to previous entry"
          >
            <i className="fa-solid fa-angles-up fa-lg"></i>
          </button>

          <button
            className="scroll-down-arrow"
            onClick={() => {
              const next = document.getElementById(`entry-${parseInt(props.post.id) + 1}`);
              if (next) next.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Scroll to next entry"
          >
            <i className="fa-solid fa-angles-down fa-lg"></i>
          </button>

          <button
            className="scroll-top-button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >            
            <i className="fa-solid fa-house fa-lg"></i>
          </button>
         
        </div>

        {props.post.id === "27" && (
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
      <hr />
    </article>
  )
}
