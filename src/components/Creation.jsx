import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createPokemon, getTypes } from "../reducer/actions";
import { ReturnBtn } from "./NotFound";
import './styles/Creation.css'

export default function Creation (){
    const dispatch = useDispatch()
    const history = useHistory()
    const {types} = useSelector((state) => state)
    const [input, setInput] = useState({
        name: '',
        image: null,
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        urlImage: ''
    }) 
    const [typeState, setTypeState] = useState([])
    const [ preview, setPreview] = useState()

    useEffect(() => {
        window.scrollTo(0, 0);
        if(!types.length) dispatch(getTypes())
    }, [])

    useEffect(() => {
        if (!input.image && !input.urlImage) {
            setPreview(undefined)
            return
        }
        if(input.image) {
           const objectUrl = URL.createObjectURL(input.image) 
           setPreview(objectUrl)
        } 
    }, [input])

    function handleSubmit(e){
        e.preventDefault();
        const {name, image, hp, attack, defense, speed, height, weight, urlImage} = input
        if(!(image || urlImage) || !name || !typeState.length || !hp || !attack || !defense || !speed || !height || !weight){
            return alert("Hay campos sin completar")
        } 
        const newPoke = {
            name,  hp, 
            image: preview,
            attack, defense, speed, height, weight,
            types: typeState,
        }
        dispatch(createPokemon(newPoke, history))
    }
    
    function handleChange(e){
        if(e.target.id === 'urlImage') {
            console.log('heree')
            setInput({...input, [e.target.id]: e.target.value, image: undefined})
            setPreview(e.target.value)
        } else{
            setInput({...input, [e.target.name]: e.target.value})
        }
    }

    function handleTypesChange(e){
        if(typeState.find(x => x === e.target.value)) {
            setTypeState(typeState.filter(x => x !== e.target.value)) 
        }else{
            if(typeState.length === 2) return
            setTypeState([...typeState, e.target.value])
        }
    }
    const onSelectFile = e => {
        console.log(e.target.files[0])
        if (!e.target.files || e.target.files.length === 0) {
            setInput({...input, image: undefined})
            return
        }else{
            setInput({...input, image: e.target.files[0], urlImage: ''})
        }
    }
    function handleSlider (e){
        setInput({...input, [e.target.id.slice(3)]:e.target.value})
    }
    
    return (
        <div className='creation'>
            <ReturnBtn/>
            <form onSubmit={handleSubmit} className='creationForm'>
                <div className='inputImg'>
                    <h2>Appearance</h2>
                    {preview ? <img alt='' src={preview}/> : <div className='uploadimg'><p>No hay imagen</p></div>}
                    <input type='file' id='image' accept="image/*" onChange={onSelectFile}/>                    
                    <label htmlFor='urlImage'>Seleccionar desde URL</label>
                    <input name='urlImage' value={input.urlImage} id='urlImage' className='input' type='text' placeholder='URL' onChange={handleChange} autocomplete='on'/>
                </div>
                <div className='inputSkills'>
                    <h2>Skills</h2>

                    <input value={input.name} name='name' className='input' type='text' placeholder='Name' onChange={handleChange} autocomplete='on'/>
                    
                    {/* ATTACK */}
                    <label htmlFor='attack'>⚔️ Attack:
                        <input value={input.attack} name='attack' className='input' type='number' min={0} max={300} onChange={handleChange}/>
                    </label>
                    <div class="slidecontainer">
                        <input type="range" class="slider" min={0} max={300} value={input.attack} id='sldattack' onChange={handleSlider}/>
                    </div>

                    {/* DEFENSE */}
                    <label htmlFor='defense'>🛡️ Defense:
                        <input value={input.defense} name='defense' className='input' type='number' min={0} max={300} onChange={handleChange}/>
                    </label>
                    <div class="slidecontainer">
                        <input type="range" class="slider" min={0} max={300} value={input.defense} id='slddefense' onChange={handleSlider}/>
                    </div>

                    {/* SPEED */}
                    <label htmlFor='speed'>⚡ Speed:
                        <input value={input.speed} name='speed' className='input' type='number' min={0} max={300} onChange={handleChange}/>
                    </label>
                    <div class="slidecontainer">
                        <input type="range" class="slider" min={0} max={300} value={input.speed} id='sldspeed' onChange={handleSlider}/>
                    </div>

                    {/* HP */}
                    <label htmlFor='hp'>❤️ HP:
                        <input value={input.hp} name='hp' className='input' type='number' min={0} max={300} onChange={handleChange}/>
                    </label>
                    <div class="slidecontainer">
                        <input type="range" class="slider" min={0} max={300} value={input.hp} id='sldhp' onChange={handleSlider}/>
                    </div>

                    {/* HEIGHT */}
                    <label htmlFor='height'>📏 Height:
                        <input value={input.height} name='height' className='input' type='number' min={0} max={300} onChange={handleChange}/>
                    </label>
                    <div class="slidecontainer">
                        <input type="range" class="slider" min={0} max={300} value={input.height} id='sldheight' onChange={handleSlider}/>
                    </div>

                    {/* WEIGHT */}
                    <label htmlFor='weight'>⚖️ Weight:
                        <input value={input.weight} name='weight' className='input' type='number' min={0} max={300} onChange={handleChange}/>
                    </label>
                    <div class="slidecontainer">
                        <input type="range" class="slider" min={0} max={300} value={input.weight} id='sldweight' onChange={handleSlider}/>
                    </div>
                </div>
                <div className='inputTypes'>
                    <h2>Type</h2>
                    <label htmlFor='Tipo'>{'Choose types '}
                        <select name='Tipo' value={'-Tipo-'} onChange={handleTypesChange}>
                            <option value='-Tipo-' disabled>-Type-</option>
                            {types.map(t => !typeState.find(x => x === t) ? <option value={t}>{capitalize(t)}</option> : null)}
                        </select>
                    </label>
                    <div className='typesSelGroup'>
                    {typeState.map(t => 
                        <div className='typeSel'>
                            <button type="button" value={t} onClick={handleTypesChange}>X</button>
                            <img alt='' className='typeImgCreate' src={`typesLogos/${t}.png`}/>
                            {capitalize(t)}
                        </div>)}
                    </div>
                </div>
                <div className='CreateFinish'>
                    <button className='CreateFinishBtn' type='submit'>Create Pokemon</button>
                </div>
            </form>
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
        </div>
    )
}
const capitalize = (str) => str[0].toUpperCase()+str.slice(1) 

