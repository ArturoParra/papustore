import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Ofertas } from "../components/Ofertas"
import { FormularioInicio } from "./FormularioInicio"
import { Shop } from "./Shop"
import { FormularioInicio } from './FormularioInicio'
import { AdministratorMode } from "./AdministratorMode"
import { FormularioAdministrator } from "./FormularioAdministrator"


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
