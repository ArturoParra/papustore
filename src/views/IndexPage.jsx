import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Ofertas } from "../views/Ofertas"
import { Shop } from "./Shop"
import { AdministratorMode } from "./AdministratorMode"
import { FormularioAdministrator } from "./FormularioAdministrator"
//   import { Ofertas } from "../components/SeccionPrincipal/Ofertas"
import { FormularioInicio } from "../views/FormularioInicio"
import { VistaProducto } from "../views/VistaProducto"
import { ConfirmarCompra } from "../views/ConfirmarCompra"
import { UserProfile } from "../views/UserProfile"
import { EditProfile } from "../views/EditProfile"

export const IndexPage = () => {
  return (
    <>
      <Header/>
      <Ofertas/>
      <Footer/>
    </>
  )
}
