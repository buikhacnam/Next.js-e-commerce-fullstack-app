import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
	newReview,
	checkReviewAvailability,
} from '../../redux/actions/roomActions'

const NewReview = () => {
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()
	const router = useRouter()

	const { reviewAvailable } = useSelector(state => state.checkReview)

	const { id } = router.query

	useEffect(() => {
		if (id !== undefined) {
			dispatch(checkReviewAvailability(id))
		}
	}, [])

	const submitHandler = () => {
		const reviewData = {
			rating,
			comment,
			roomId: id,
		}

		dispatch(newReview(reviewData))
	}

	function setUserRatings() {
		const stars = document.querySelectorAll('.star')

		stars.forEach((star, index) => {
			// index + 1 because rating starts from 1
			star.starValue = index + 1
			;['click', 'mouseover', 'mouseout'].forEach(function (e) {
				star.addEventListener(e, showRatings)
			})
		})

		function showRatings(e) {
			stars.forEach((star, index) => {
				// update color of all stars when one of the events is triggered
				if (e.type === 'click') {
					if (this.starValue > index) {
						star.classList.add('red')
						setRating(this.starValue)
					} else {
						star.classList.remove('red')
					}
				}

				if (e.type === 'mouseover') {
					if (index < this.starValue) {
						star.classList.add('light-red')
					} else {
						star.classList.remove('light-red')
					}
				}

				if (e.type === 'mouseout') {
					star.classList.remove('light-red')
				}
			})
		}
	}

	return (
		<>
			<button
				id='review_btn'
				type='button'
				className='btn btn-primary mt-4 mb-5'
				data-toggle='modal'
				data-target='#ratingModal'
				onClick={reviewAvailable ? setUserRatings : () => {}}
				disabled={!reviewAvailable}
				title={
					reviewAvailable
						? 'Click to rate'
						: 'You need to book the room before leaving review'
				}
			>
				Submit Your Review
			</button>

			<div
				className='modal fade'
				id='ratingModal'
				tabIndex='-1'
				role='dialog'
				aria-labelledby='ratingModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog' role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='ratingModalLabel'>
								Submit Review
							</h5>

							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true'>&times;</span>
							</button>
						</div>
						<div className='modal-body'>
							<ul className='stars'>
								<li className='star'>
									<i className='fa fa-star'></i>
								</li>
								<li className='star'>
									<i className='fa fa-star'></i>
								</li>
								<li className='star'>
									<i className='fa fa-star'></i>
								</li>
								<li className='star'>
									<i className='fa fa-star'></i>
								</li>
								<li className='star'>
									<i className='fa fa-star'></i>
								</li>
							</ul>

							<textarea
								name='review'
								id='review'
								className='form-control mt-3'
								value={comment}
								onChange={e => setComment(e.target.value)}
							></textarea>

							<button
								className='btn my-3 float-right review-btn px-4 text-white'
								data-dismiss='modal'
								aria-label='Close'
								onClick={submitHandler}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewReview
