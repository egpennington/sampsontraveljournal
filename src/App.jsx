import Header from "/components/Header"
import Entry from "/components/Entry"
import travelData from "./travelData"

export default function App() {
  
  
  const travelElements = travelData.map((post) => {
    console.log(post.img)
    return (
      <Entry 
        img={post.img}
        title={post.title}
        country={post.country}
        googleMap={post.googleMapsLink}
        date={post.dates}
        text={post.text}
      />
    )
  })
  
  return (
    <> 
      <Header />
      
      {travelElements}
    </>
  )
}





