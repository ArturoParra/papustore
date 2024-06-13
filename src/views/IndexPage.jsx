import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Ofertas } from "../components/Ofertas"
import { Shop } from "./Shop"
import { AdministratorMode } from "./AdministratorMode"
import { FormularioAdministrator } from "./FormularioAdministrator"
//   import { Ofertas } from "../components/SeccionPrincipal/Ofertas"


export const IndexPage = () => {
  return (
    <>
      {/* <Header/> */}
      <Header/>
      <Ofertas/>
      {/* <Footer/> */}
    </>
  )
}
