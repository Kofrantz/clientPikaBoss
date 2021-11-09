import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import bg from '../multimedia/landingPikaBoss.png';
import {getPokemons} from '../reducer/actions'
import PikaBossSvg from './pikaBossSVG';
import './styles/LandingPage.css'

export default function LandingPage(){
    const dispatch = useDispatch()
    return(
        <div className="lp">
            <div className="bgGrad"/>
            <div className="bgBlack"/>
            <h1 className='titleLp'>PikaBoss</h1>
            <img alt='' className="bg" src={bg}/>
            <div className='ray'>
                <div className='ray2'></div>
            </div>
            <PikaBossSvg className='pikaBossSvg'/>
            <div className='infoDivContainer'>
                <div className='space'></div>
                <div className="infoDiv">
                    <p className='infoDivP'>Busca información de tus Pokemons favoritos o crea nuevos Pokemons</p>
                    <NavLink exact to='/home'>
                        <button data-testid='empezar' className='btnEmpezar' 
                        OnClick={() => dispatch(getPokemons())}>
                            Empezar
                        </button>  
                        <div className='electric'>
                            <svg width="200" height="50" xmlns="http://www.w3.org/2000/svg">
                                <filter id="turbulence">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.06"
                                        numOctaves="1" result="turbulence" seed="3">
                                            {/* <animate attributeName="baseFrequency" values="0.05;0.08" dur="0.5s" repeatCount="indefinite" /> */}
                                            <animate attributeName="seed" values="1;10" dur="0.5s" repeatCount="indefinite" />
                                    </feTurbulence>
                                    <feDisplacementMap in2="turbulence" in="SourceGraphic"
                                        scale="50" xChannelSelector="R" yChannelSelector="B"/>
                                </filter>    
                                <filter id="turbulence2">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.05"
                                        numOctaves="1" result="turbulence2" seed="3">
                                            {/* <animate attributeName="baseFrequency" values="0.05;0.08" dur="0.5s" repeatCount="indefinite" /> */}
                                            <animate attributeName="seed" values="3;13" dur="0.5s" repeatCount="indefinite" />
                                    </feTurbulence>
                                    <feDisplacementMap in2="turbulence2" in="SourceGraphic"
                                        scale="50" xChannelSelector="R" yChannelSelector="B"/>
                                </filter>    
                                <filter id="white-glow">
                                    <feFlood result="flood" flood-color="blue" flood-opacity="1"></feFlood>
                                    <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                                    <feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology>
                                    <feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur>
                                    <feMerge>
                                        <feMergeNode in="blurred"></feMergeNode>
                                        <feMergeNode in="SourceGraphic"></feMergeNode>
                                    </feMerge>
                                </filter>   
                                <filter id="white-glow-animated">
                                    <feFlood result="flood" flood-color="blue" flood-opacity="1"></feFlood>
                                    <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                                    <feMorphology in="mask" result="dilated" operator="dilate" radius="2">
                                        <animate attributeName="radius" values="2;7;2" dur="0.15s" repeatCount="indefinite" />
                                    </feMorphology>
                                    <feGaussianBlur in="dilated" result="blurred" stdDeviation="5"></feGaussianBlur>
                                    <feMerge>
                                        <feMergeNode in="blurred"></feMergeNode>
                                        <feMergeNode in="SourceGraphic"></feMergeNode>
                                    </feMerge>
                                </filter>            
                                {/* <circle className="cir" cx="150" cy="60" r="50" stroke="white" 
                                    stroke-width="1" fill='transparent'/>
                                    <circle className="cir2" cx="150" cy="60" r="50" stroke="white" 
                                stroke-width="2" fill='transparent'/> */}
                            </svg>
                            <div className="circles">
                                <div className="cir"/>
                                <div className="cir2"/>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
