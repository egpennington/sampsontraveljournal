import { useState } from "react"
export default function Entry(props) {
    
    const [likes, setLikes] = useState(0)

    return(
        <article className="entry"> 
            <div className="location-img-container">
                <img src={props.img.src} className="location-img" />
            </div>                

            <div className="location-card">                
                <img src="./images/marker.png" className="location-marker" alt="map marker icon" />

                <span className="location-place">{props.location}</span>

                <a href={props.map} target="_blank">View on Google Maps</a>

                <h2 className="location-title">{props.title}</h2>
                <p className="location-date">{props.date}</p>
                <p className="location-text">
                    {props.text}
                </p>
               
                <button className="likeBtn" onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
            </div>            
        </article>
    )
    
}