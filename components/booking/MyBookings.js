import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
	checkBooking,
	getBookedDates,
} from '../../redux/actions/bookingActions'
import Link from 'next/link'
import { MDBDataTable } from 'mdbreact'
import easyinvoice from 'easyinvoice'

const MyBookings = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { bookings } = useSelector(state => state.bookings)

	const downloadInvoice = async booking => {
		console.log('booking', booking)
		const data = {
			documentTitle: 'Next Cruise Booking INVOICE', //Defaults to INVOICE
			currency: 'USD',
			taxNotation: 'vat', //or gst
			marginTop: 25,
			marginRight: 25,
			marginLeft: 25,
			marginBottom: 25,
			logo:
				'https://res.cloudinary.com/dvo4lwa00/image/upload/v1637018804/cruise/logo/sailboat_zdslr3.png',
			sender: {
				company: 'Next Cruise',
				address: '13th Street. 47 W 13th St',
				zip: '10001',
				city: 'New York',
				country: 'United States',
			},
			client: {
				company: `${booking.user.name}`,
				address: `${booking.user.email}`,
				zip: '',
				city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
					'en-US'
				)}`,
				country: `Check In: ${new Date(
					booking.checkOutDate
				).toLocaleString('en-US')}`,
			},
			invoiceNumber: `${booking._id}`,
			invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,
			products: [
				{
					quantity: `${booking.daysOfStay}`,
					description: `${booking.room.name}`,
					tax: 0,
					price: booking.room.pricePernight,
				},
			],
			bottomNotice:
				'This is auto generated Invoice of your booking on Next Cruise. Visit buinam.com for more details',
		}

		const result = await easyinvoice.createInvoice(data)
		easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
	}

	const setBookings = () => {
		const data = {
			columns: [
				{
					label: 'Booking ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Check In',
					field: 'checkIn',
					sort: 'asc',
				},
				{
					label: 'Check Out',
					field: 'checkOut',
					sort: 'asc',
				},
				{
					label: 'Amount Paid',
					field: 'amount',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
				},
			],
			rows: [],
		}

		bookings &&
			bookings.forEach(booking => {
				data.rows.unshift({
					id: booking._id,
					checkIn: new Date(booking.checkInDate).toLocaleString(
						'en-US'
					),
					checkOut: new Date(booking.checkOutDate).toLocaleString(
						'en-US'
					),
					amount: `$${booking.amountPaid}`,
					actions: (
						<>
							<Link href={`/bookings/${booking._id}`}>
								<a className='btn btn-primary'>
									<i className='fa fa-eye'></i>
								</a>
							</Link>

							<button
								className='btn btn-success mx-2'
								onClick={() => downloadInvoice(booking)}
							>
								<i className='fa fa-download'></i>
							</button>
						</>
					),
				})
			})

		return data
	}
	return (
		<>
			<div className='container container-fluid'>
				<h1 className='my-5'>My Bookings</h1>

				<MDBDataTable
					data={setBookings()}
					className='px-3'
					bordered
					striped
					hover
				/>
			</div>
		</>
	)
}

export default MyBookings
