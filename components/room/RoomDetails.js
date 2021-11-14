import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from '../../redux/actions/roomActions'
import Head from 'next/head'
import { Carousel } from 'react-bootstrap'
import Image from 'next/image'
import RoomFeatures from './RoomFeatures'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import {
	checkBooking,
	getBookedDates,
} from '../../redux/actions/bookingActions'
import axios from 'axios'

const RoomDetails = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { room, error } = useSelector(state => state.roomDetails)
	const { dates } = useSelector(state => state.bookedDates)
	const { available, loading: bookingLoading } = useSelector(
		state => state.checkBooking
	)
	const [excludedDates, setExcludedDates] = useState([])
	const { user } = useSelector(state => state.loadedUser)
	const [checkInDate, setCheckInDate] = useState(null)
	const [checkOutDate, setCheckOutDate] = useState(null)
	const [daysOfStay, setDaysOfStay] = useState(0)
	const { id } = router.query

	useEffect(() => {
		dispatch(getBookedDates(id))
	}, [])

	useEffect(() => {
		if (dates.length > 0) {
			const excludedDays = dates.map(date => {
				return new Date(date)
			})
			setExcludedDates(excludedDays)
		}
	}, [dates])

	const onChange = dates => {
		//dates is an array of start and end dates: [startDate, endDate]
		setCheckInDate(dates[0])
		setCheckOutDate(dates[1])

		if (dates[0] && dates[1]) {
			// calculate days of stay, 86400000 is 1 day in milliseconds
			const days = Math.floor(
				(new Date(dates[1]) - new Date(dates[0])) / 86400000 + 1
			)
			setDaysOfStay(days)

			console.log({
				checkin: dates[0]?.toISOString(),
				checkout: dates[1]?.toISOString(),
			})
			dispatch(
				checkBooking(id, dates[0].toISOString(), dates[1].toISOString())
			)
		}
	}

	const newBookingHandler = async () => {
		const bookingData = {
			room: router.query.id,
			checkInDate,
			checkOutDate,
			daysOfStay,
			amountPaid: 100,
			paymentInfo: {
				id: 'STRIPE_PAYMENT_ID',
				status: 'PAID',
			},
		}

		console.log({ bookingData })

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/bookings',
				bookingData,
				config
			)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Head>
				<title>{room.name}</title>
			</Head>
			<div className='container container-fluid'>
				<h2 className='mt-5'>{room.name}</h2>
				<p>{room.address}</p>

				<div className='ratings mt-auto mb-3'>
					<div className='rating-outer'>
						<div
							className='rating-inner'
							style={{
								width: `${(room.ratings / 5) * 100}%`,
							}}
						></div>
					</div>
					<span id='no_of_reviews'>
						(({room.numOfReviews} Reviews))
					</span>
				</div>

				<Carousel hover='pause'>
					{room.images &&
						room.images.map(image => (
							<Carousel.Item key={image.public_id}>
								<div style={{ width: '100%', height: '440px' }}>
									<Image
										className='d-block m-auto'
										src={image.url}
										alt={room.name}
										layout='fill'
									/>
								</div>
							</Carousel.Item>
						))}
				</Carousel>

				<div className='row my-5'>
					<div className='col-12 col-md-6 col-lg-8'>
						<h3>Description</h3>
						<p>{room.description}</p>

						<RoomFeatures room={room} />
					</div>

					<div className='col-12 col-md-6 col-lg-4'>
						<div className='booking-card shadow-lg p-4'>
							<p className='price-per-night'>
								<b>${room.pricePernight}</b> / night
							</p>
							<hr />

							<p className='mt-5 mb-3'>
								Pick Check In & Check Out Date
							</p>

							<DatePicker
								className='w-100'
								selected={checkInDate}
								onChange={onChange}
								startDate={checkInDate}
								endDate={checkOutDate}
								selectsRange
								inline
								minDate={new Date()}
								excludeDates={excludedDates}
							/>
							{available === true && (
								<div className='alert alert-success my-3 font-weight-bold'>
									Room is available. Book now.
								</div>
							)}

							{available === false && (
								<div className='alert alert-danger my-3 font-weight-bold'>
									Room not available. Try different dates.
								</div>
							)}

							{available && !user && (
								<div className='alert alert-danger my-3 font-weight-bold'>
									Login to book room.
								</div>
							)}

							<button
								onClick={newBookingHandler}
								className='btn btn-block py-3 booking-btn'
							>
								Pay
							</button>
						</div>
					</div>
				</div>

				<div className='reviews w-75'>
					<h3>Reviews:</h3>
					<hr />
					<div className='review-card my-3'>
						<div className='rating-outer'>
							<div className='rating-inner'></div>
						</div>
						<p className='review_user'>by John</p>
						<p className='review_comment'>Good Quality</p>

						<hr />
					</div>

					<div className='review-card my-3'>
						<div className='rating-outer'>
							<div className='rating-inner'></div>
						</div>
						<p className='review_user'>by John</p>
						<p className='review_comment'>Good Quality</p>

						<hr />
					</div>
				</div>
			</div>
		</>
	)
}

export default RoomDetails
