/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from 'react-redux'
import RoomItem from './room/RoomItem'
import { useEffect } from 'react'
import { clearErrors } from '../redux/actions/roomActions'
import { toast } from 'react-toastify'

const Home = () => {
	const dispatch = useDispatch()
	const { rooms, error } = useSelector(state => state.allRooms)
	console.log('rooms', rooms)

	useEffect(() => {
		if (error) {
			toast.error(error)
			dispatch(clearErrors())
		}
	}, [])
	return (
		<section id='rooms' className='container mt-5'>
			<h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

			<a href='#' className='ml-2 back-to-search'>
				{' '}
				<i className='fa fa-arrow-left'></i> Back to Search
			</a>
			<div className='row'>
				{rooms && rooms.length === 0 ? (
					<div className='alert alert-danger'>
						<b>No rooms found</b>
					</div>
				) : (
					rooms.map(room => <RoomItem key={room.id} room={room} />)
				)}
			</div>
		</section>
	)
}

export default Home
