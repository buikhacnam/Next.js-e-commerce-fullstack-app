import { getSession } from 'next-auth/client'
import BookingDetails from '../../components/booking/BookingDetails'
import { wrapper, Wrapper } from '../../redux/store'
import { bookingDetais } from '../../redux/actions/bookingActions'

export const BookingDetailsPage = () => {
	return <BookingDetails />
}

export default BookingDetailsPage

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
			bookingDetais(
				context.req.headers.cookie,
				context.req,
				context.params.id
			)
		)

		return {
			props: {
				session,
			},
		}
	}
)
