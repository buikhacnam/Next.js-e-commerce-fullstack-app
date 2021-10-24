import Home from '../components/Home'
import { getAllRooms } from '../redux/actions/roomActions'
import { wrapper } from '../redux/store'
import { useDispatch } from 'react-redux'

export default function Index() {
	const dispatch = useDispatch()
	return <Home />
}
export const getServerSideProps = wrapper.getServerSideProps(
	store => async ({ req }) => {
		await store.dispatch(getAllRooms(req))
	}
)
