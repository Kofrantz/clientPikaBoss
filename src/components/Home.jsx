import Nav from "./Nav";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { aboutMsgFalse, getPokemons, getTypes } from "../reducer/actions";
import PikaBossSvg2 from "./pikaBossSVG2";
import Footer from "./Footer";

export default function Home(){
    const {pokemons, types, aboutMsg} = useSelector((state) => state)
    const [aboutInv, setAboutInv] = useState(false)
    const dispatch = useDispatch()
    
    function changeAbout(e){
        setAboutInv(e)
        dispatch(aboutMsgFalse())
    }
    useEffect(() => {
        if(!types.length) dispatch(getTypes())
        if(!pokemons.length) dispatch(getPokemons())
        aboutMsg && setTimeout(() => changeAbout(true), 10000) 
    }, [])

    return (
        <div className='home' >
            <Nav/>
            <Cards data-testid='cardsPage'/>
            {aboutInv && <PikaBossSvg2 changeabout={changeAbout} /* aboutInv={aboutInv} *//>}
            <Footer/>
        </div>
    )
}