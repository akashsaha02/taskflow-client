import TaskBoard from "../components/TaskBoard"
import useAuth from "../hooks/useAuth"

const Home = () => {
  const { user } = useAuth()
  return (
    <div className="">
      {user && <TaskBoard />}
    </div>
  )
}

export default Home