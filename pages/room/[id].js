import RoomDetails from '../../components/room/RoomDetails'
import { wrapper } from '../../redux/store'
import { getRoomDetails } from '../../redux/actions/roomActions'

const RoomDetailsPage = () => {
	return <RoomDetails />
}

export default RoomDetailsPage

export const getServerSideProps = wrapper.getServerSideProps(
	store => async ({ req, params, query }) => {
		console.log('11111 params', params, '11111 query', query)
		//11111 params { id: '615e309325e09c43e5485960' } 11111 query { id: '615e309325e09c43e5485960' }
		await store.dispatch(getRoomDetails(req, params.id))
	}
)
