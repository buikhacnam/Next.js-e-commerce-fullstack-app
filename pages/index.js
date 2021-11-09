import Home from '../components/Home'
import { getAllRooms } from '../redux/actions/roomActions'
import { wrapper } from '../redux/store'

export default function Index() {
	return <Home />
}
export const getServerSideProps = wrapper.getServerSideProps(
	store => async ({ req, params, query }) => {
		console.log('0000params',params, '000000query', query) // { page: '2' } params undefined
		await store.dispatch(getAllRooms(req, query))
	}
)
