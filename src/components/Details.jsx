import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getDetails, clearDetails, getPokemonByName, deletePokemon } from "../reducer/actions"
import Loading from "./Loading"
import NotFound, { ReturnBtn } from "./NotFound"
import './styles/details.css'

export default function Details(props){
    const d = useSelector((state) => state.details)
    //const [anim, setAnim] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory() 
    
    useEffect(() => {
        if(parseInt(props.id) || props.id.length > 20){
            dispatch(getDetails(props.id))
        }else{
            dispatch(getPokemonByName(props.id))
        }
        //if(Object.keys(d).length) 
        return () => {dispatch(clearDetails())}
    }, [])

    function handleDelete(){
        dispatch(deletePokemon(d.id)) 
        history.push('/home')
    }

    return(<>
        {console.log(d)}
        {!Object.keys(d).length ? <Loading/> : 
        d.name === 'Error' ? <NotFound/> :
        <div className="Details">
            <ReturnBtn/>
            <h1>{capitalize(d.name)}</h1>
            <div className="detAndImgContainer">
                <img alt='' className='primaryImg' src={d.image} />
                <div className='detContainer'>
                    <div className="statBars">
                        <div className="statBar">❤️ HP: {d.hp}
                            <div className='bgStat'>
                                <div className='stat' style={{maxWidth: `${Math.round(100/300*d.hp)}%`}}></div>
                            </div>
                        </div>
                        <div className="statBar">⚔️ Attack: {d.attack}
                            <div className='bgStat'>
                                <div className='stat' style={{maxWidth: `${Math.round(100/300*d.attack)}%`}}></div>
                            </div>
                        </div>
                        <div className="statBar">🛡️ Defense: {d.defense}
                            <div className='bgStat'>
                                <div className='stat' style={{maxWidth: `${Math.round(100/300*d.defense)}%`}}></div>
                            </div>
                        </div>
                        <div className="statBar">⚡ Speed: {d.speed}
                            <div className='bgStat'>
                                <div className='stat' style={{maxWidth: `${Math.round(100/300*d.speed)}%`}}></div>
                            </div>
                        </div>
                    </div>
                    <div className='extraStats'>
                        <div>📏 Height: {d.height}</div>
                        <div>⚖️ Weight: {d.weight}</div>
                        <div>ID: {d.id}</div>
                    </div>
                    <div className='detTypesContainer'>
                        {d.types?.map(t => {
                            return (
                                <div key={t} className='detType'>
                                    <img alt='' className='detTypeImg' src={process.env.PUBLIC_URL + `/typesLogos/${t}.png`}/>
                                    <p >{capitalize(t)}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {d.origin === 'My' && <button className='deleteBtn' onClick={handleDelete}>Delete Pokemon</button>}
            </div>
            <svg style={{position: 'absolute', height: 0, width: 0}}>
                <filter id="blue-glow">
                    <feFlood result="flood" flood-color="blue" flood-opacity="1"></feFlood>
                    <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                    <feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology>
                    <feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur>
                    <feMerge>
                        <feMergeNode in="blurred"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </svg>
        </div>}
        </>
    )
}
const capitalize = (str) => str[0].toUpperCase()+str.slice(1) 

const maxStats = {
    hp: 255,
    attack: 181,
    defense: 230,
    speed: 160
}