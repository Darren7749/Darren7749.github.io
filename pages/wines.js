import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


const wineImage = {
    borderRadius: "5%",
    width: '5rem',

}

const wineMenu = {
    width: "30rem", 
    overflow: "hidden",
    background: "#800000",
    color: "#FF0000",
    marginBottom: "5rem",
    padding: "0.5rem"
}
const wineDetails = {
    marginLeft: "1rem",
}
export default function Wine() {
    /*
    1. Fetch from https://api.sampleapis.com/wines/reds
    2. Trsnsform into JSX
    */
    let items = []
    let [wineTitles, setwineTitles] = React.useState([])

    React.useEffect(async () => {
        // Run once after the page finished loading
        // Fetch from https://api.sampleapis.com/wines/reds
        let res = await fetch('https://api.sampleapis.com/wines/reds')
        let wines = await res.json()
        for (let i = 0; i < wines.length; i++) {
            console.log(wines[i].title)
            items.push(
                <div style={wineMenu} >
                    <div style={{ width: "4rem", float: "left" }}> <img style={wineImage} src={wines[i].image} /> </div>
                    <div style={wineDetails}>
                        <h2>{wines[i].winery}</h2>
                        <h4>{wines[i].wine} </h4>
                         {wines[i].location} </div>
            
                </div>
            )
        }

        setwineTitles(items)
    }, [])

    return (
        <div style={{ margin: "1rem" }}>
            <h1>wine</h1>
            <main>
                {wineTitles}
            </main>
        </div>
    )
}

