import Home from '../components/Home'
import { getAllRooms } from '../redux/actions/roomActions'
import { wrapper } from '../redux/store'

export default function Index() {
	return <Home />
}
export const getServerSideProps = wrapper.getServerSideProps(
	store => async ({ req, query }) => {
		console.log('q', query) // { page: '2' }
		await store.dispatch(getAllRooms(req, query))
	}
)
