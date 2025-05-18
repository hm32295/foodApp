import img from "../../../../assets/image/header dashboard.png"
import Header from '../../../Shared/componetns/Header/Header'

export default function Dashboard() {
  return (
    <>
      <Header img={img} title={"welcome user"} description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>
    </>
  )
}
