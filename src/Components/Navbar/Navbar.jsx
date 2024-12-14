import { useNavigate } from "react-router-dom"
import Container from "../Shared/Container"
import logoImg from '../../../public/logo.webp'
import MenuDropdown from "./MenuDropdown"

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed w-full bg-gray-50 z-20 shadow-sm hover:bg-gray-300 transition-all duration-300 ease-in-out">
      <div className="py-4 border-b border-gray-200">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <button onClick={() => { navigate('/'); window.location.reload() }} >

              <img
                src={logoImg}
                alt="logo"
                width="30"
                height="30"
              />
            </button>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>

  )
}

export default Navbar