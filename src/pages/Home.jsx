import TaskBoard from "../components/TaskBoard"
import useAuth from "../hooks/useAuth"

const Home = () => {
  const { user } = useAuth()
  return (
    <div className=" container mx-auto px-4">
      <span>Hi</span>

      {user && <TaskBoard />}
    </div>
  )
}

export default Home