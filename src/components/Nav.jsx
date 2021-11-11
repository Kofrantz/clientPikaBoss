import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router'
import { Link } from "react-router-dom";
import { toogleMenu } from "../reducer/actions";
import pikaBossLogo from '../multimedia/pikaboss.png'
import './styles/Nav.css';

export default function Nav(){
    const dispatch = useDispatch() 
    
    function handleMenu(e){
        dispatch(toogleMenu())
    }

    return (
        <div className='nav'>
            <button className='menu' onClick={handleMenu}></button>
            <Link exact to='/home'>
                <div className='titleHome'>
                    <img alt=''  src={pikaBossLogo} className='pikaBossImg'/>
                    <div className='titleH'>PikaBoss</div>
                </div>
            </Link>
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
            <svg style={{display: 'none', height: 0, width: 0}}>
                <filter id="self-color-glow">
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
            <SearchBar class='normal'/>
            <CreateBtn class='normal'/>
        </div>
    )
}
export function SearchBar(props){
    const [input, setInput] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    function handleChange(e){
        setInput(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(toogleMenu(false))
        history.replace('/home/'+input)
    }
    return (
        <form className={'searchBar '+props.class} onSubmit={handleSubmit}>
            {props.class === 'movil' && <h3>Search</h3> }
            <input type='text' placeholder='Search Pokemon...'
            value={input} onChange={handleChange}
            data-testid='searchBar'/>
            <button type='submit' className='searchBtn'>Search</button>
        </form>
    )
}
export function CreateBtn(props){
    const dispatch = useDispatch()
    return (
        <div className={'create '+props.class}>
            <Link exact to='/create'>
                <button onClick={()=>{dispatch(toogleMenu(false))}} className='createBtn'><p id='txtCrear'>+ Create Pokemon</p></button>
            </Link>
        </div>
    )
}