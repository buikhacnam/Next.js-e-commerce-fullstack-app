import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NotFound = () => {
	return (
		<div className='page-not-found-wrapper'>
			<h2 id='title_404'>404!</h2>
			<h3 id='description_404'>
				Page Not Found. Back to <Link href='/'>Homepage</Link>{' '}
			</h3>
            <img src='/images/sailboat.png' alt='logo'/>
		</div>
	)
}

export default NotFound
