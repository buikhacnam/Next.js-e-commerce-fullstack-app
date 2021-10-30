import { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import ButtonLoader from '../layout/ButtonLoader'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearErrors } from '../../redux/actions/userActions'

const Register = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { success, error, loading } = useSelector(state => state.auth)
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	})
	const [avatar, setAvatar] = useState(null)
	const [avatarPreview, setAvatarPreview] = useState(null)

	useEffect(() => {
		if (success) {
			toast.success('Register Successfully!')
			dispatch(clearErrors())
			router.push('/login')
		}
		if (error) {
			toast.error(error)
			dispatch(clearErrors())
		}
	}, [dispatch, success, error])

	const submitHandler = e => {
		e.preventDefault()
		dispatch(registerUser({ ...user, avatar }))
	}

	const selectImg = e => {
		const reader = new FileReader()
		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result)
				setAvatar(reader.result)
			}
		}
		reader.readAsDataURL(e.target.files[0])
	}

	return (
		<div className='container container-fluid'>
			<div className='row wrapper'>
				<div className='col-10 col-lg-5'>
					<form className='shadow-lg' onSubmit={submitHandler}>
						<h1 className='mb-3'>Join Us</h1>

						<div className='form-group'>
							<label htmlFor='name_field'>Full Name</label>
							<input
								type='text'
								id='name_field'
								className='form-control'
								value={user.name}
								onChange={e =>
									setUser({ ...user, name: e.target.value })
								}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='email_field'>Email</label>
							<input
								type='email'
								id='email_field'
								className='form-control'
								value={user.email}
								onChange={e =>
									setUser({ ...user, email: e.target.value })
								}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password_field'>Password</label>
							<input
								type='password'
								id='password_field'
								className='form-control'
								value={user.password}
								onChange={e =>
									setUser({
										...user,
										password: e.target.value,
									})
								}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='avatar_upload'>Avatar</label>
							<div className='d-flex align-items-center'>
								<div>
									<figure className='avatar mr-3 item-rtl'>
										<img
											src={
												avatarPreview ||
												'https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
											}
											className='rounded-circle'
											alt='image'
										/>
									</figure>
								</div>
								<div className='custom-file'>
									<input
										type='file'
										name='avatar'
										className='custom-file-input'
										id='customFile'
										accept='image/*'
										onChange={selectImg}
									/>
									<label
										className='custom-file-label'
										htmlFor='customFile'
									>
										Choose Avatar
									</label>
								</div>
							</div>
						</div>

						<button
							id='login_button'
							type='submit'
							className='btn btn-block py-3'
							disabled={loading}
						>
							{loading ? <ButtonLoader /> : 'REGISTER'}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Register
