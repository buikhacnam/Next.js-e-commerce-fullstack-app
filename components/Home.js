import { useSelector, useDispatch } from 'react-redux'
import RoomItem from './room/RoomItem'
import { useEffect, useState } from 'react'
import { clearErrors } from '../redux/actions/roomActions'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Home = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const {
		rooms,
		resPerPage,
		roomsCount,
		filteredRoomsCount,
		error,
	} = useSelector(state => state.allRooms)
	const [page, setPage] = useState(Number(router.query?.page) || 1)
	const location = router.query?.location
	let count = roomsCount
	if (location) count = filteredRoomsCount

	useEffect(() => {
		if (error) {
			toast.error(error)
			dispatch(clearErrors())
		}
	}, [])

	const handlePagination = pageNumber => {
		setPage(pageNumber)
		router.push(`/?page=${pageNumber}`)
	}
	return (
		<>
			<section id='rooms' className='container mt-5'>
				<h2 className='mb-3 ml-2 stays-heading'>
					{location ? `Stay in ${location}` : 'Next Cruise - All Cabins'}
				</h2>

				<Link href='/search' passHref>
					<a className='ml-2 back-to-search'>
						<i className='fa fa-arrow-left'></i> Back to Search
					</a>
				</Link>
				<div className='row'>
					{rooms && rooms.length === 0 ? (
						<div className='alert alert-danger mt-5 w-100'>
							<b>No rooms found</b>
						</div>
					) : (
						rooms.map(room => (
							<RoomItem key={room.id} room={room} />
						))
					)}
				</div>
			</section>
			{resPerPage < count && (
				<div className='d-flex justify-content-center mt-5'>
					<Pagination
						activePage={page}
						itemsCountPerPage={resPerPage}
						totalItemsCount={roomsCount}
						nextPageText='Next'
						prevPageText='Previous'
						itemClass='page-item'
						linkClass='page-link'
						firstPageText='First'
						lastPageText='Last'
						onChange={handlePagination}
					/>
				</div>
			)}
		</>
	)
}

export default Home
