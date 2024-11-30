import { Link } from "react-router-dom"
import Container from "../Shared/Container"
import logoImg from '../../../public/logo.webp'
import MenuDropdown from "./MenuDropdown"

const Navbar = () => {
  return (
    <div className="fixed w-full bg-gray-50 z-10 shadow-sm hover:bg-gray-300 transition-all duration-300 ease-in-out">
      <div className="py-4 border-b border-gray-200">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img
                className="hidden md:block"
                src={logoImg}
                alt="logo"
                width="30"
                height="30"
              />
            </Link>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>

  )
}

export default Navbar