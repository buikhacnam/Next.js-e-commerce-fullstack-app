import { getSession } from 'next-auth/client'
import MyBookings from '../../components/booking/MyBookings'
import { wrapper, Wrapper } from '../../redux/store'
import { myBookings } from '../../redux/actions/bookingActions'

export const UpdateProfilePage = () => {
	return <MyBookings />
}

export default UpdateProfilePage

export const getServerSideProps = wrapper.getServerSideProps(
	store => async context => {
		const session = await getSession(context)
		// check for protected page
		if (!session) {
			return {
				redirect: {
					destination: '/login',
					permanent: false, //will not be cached client search engine
				},
			}
		}

		//the session is available, but unavailble in the backend, so we need to pass cookie to the header

		await store.dispatch(
			myBookings(context.req.headers.cookie, context.req)
		)

		return {
			props: {
				session,
			},
		}
	}
)
