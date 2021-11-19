import React from 'react'

export default function Footer() {
	return (
		<footer className='py-1'>
			<p className='text-center mt-1'>
				About:{' '}
				<a href='https://buinam.com/' target='_blank' rel='noreferrer'>
					buinam.com
				</a>{' '}
				| Code Source:{' '}
				<a
					href='https://github.com/buikhacnam/nextJS-cruise-fullstack-app'
					target='_blank'
					rel='noreferrer'
				>
					Github
				</a>
			</p>
		</footer>
	)
}
