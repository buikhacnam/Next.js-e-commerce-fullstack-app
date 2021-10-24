import Home from '../components/Home'
import { getAllRooms } from '../redux/actions/roomActions'
import { wrapper } from '../redux/store'

export default function Index() {
	return <Home />
}
export const getServerSideProps = wrapper.getServerSideProps(
	store => async ({ req }) => {
		await store.dispatch(getAllRooms(req))
	}
)
