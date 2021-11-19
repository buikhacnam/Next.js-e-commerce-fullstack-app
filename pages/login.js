import Login from '../components/auth/login'
import { getSession } from 'next-auth/client'

const LoginPage = () => {
	return (
		<>
			<Login />
			<div style={{textAlign: 'center', marginTop: '5px', fontSize: '0.9rem'}}>
				<p style={{marginBottom: '5px'}}>Testing Account: buikhacnam11@gmail.com</p>
				<p>Password: 123456</p>
			</div>
		</>
	)
}

export default LoginPage

export async function getServerSideProps(context) {
	const session = await getSession(context)
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false, //only push user to login page once
			},
		}
	}
	return {
		props: {},
	}
}
