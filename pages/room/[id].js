import RoomDetails from '../../components/room/RoomDetails'
import { wrapper } from '../../redux/store'
import { getRoomDetails } from '../../redux/actions/roomActions'

const RoomDetailsPage = () => {
	return <RoomDetails />
}

export default RoomDetailsPage

export const getServerSideProps = wrapper.getServerSideProps(
	store => async ({ req, params }) => {
		await store.dispatch(getRoomDetails(req, params.id))
	}
)
