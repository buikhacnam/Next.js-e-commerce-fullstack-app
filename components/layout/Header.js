/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
export default function Header() {
	return (
		<div>
			<nav className='navbar row justify-content-center sticky-top'>
				<div className='container'>
					<div className='col-3 p-0'>
						<div className='navbar-brand'>
							<Link href='/' passHref>
								<img
									height='50'
									width='50'
									style={{ cursor: 'pointer' }}
									src='/images/sailboat.png'
									alt='Adventure Cruise'
								/>
							</Link>
						</div>
					</div>

					<div className='col-3 mt-3 mt-md-0 text-center'>
						<Link href='/login' passHref>
							<a className='btn btn-danger px-4 text-white login-header-btn float-right'>
								Login
							</a>
						</Link>
					</div>
				</div>
			</nav>
		</div>
	)
}
