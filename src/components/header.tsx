import nlwUniteIcon from '../assets/logo.svg'
import { NavLink } from './nav-link'

export const Header = () => {
  return (
    <div className={`flex items-center gap-5 py-2`}>
      <img src={nlwUniteIcon} alt='' />
      <nav className='flex items-center gap-5'>
        <NavLink href="/events">Eventos</NavLink>
        <NavLink href="/attendees">Participantes</NavLink>
      </nav>
    </div>
  )
}