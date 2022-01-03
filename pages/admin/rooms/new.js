import React from 'react'
import { getSession } from 'next-auth/client'
import NewRoomPage from '../../../components/admin/NewRoom'
import { wrapper } from '../../../redux/store'

const AllRoomsPage = () => {
	return <NewRoomPage />
}

export const getServerSideProps = wrapper.getServerSideProps(
	store => async context => {
		const session = await getSession(context)
		if (!session || session.user.user.role !== 'admin') {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			}
		}

		return {
			props: {},
		}
	}
)

export default AllRoomsPage
