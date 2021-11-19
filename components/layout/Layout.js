import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children, title = 'Book The Best Cruise!' }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<Header />
			<ToastContainer position='bottom-right'/>
			{children}
			<Footer />
		</div>
	)
}

export default Layout
