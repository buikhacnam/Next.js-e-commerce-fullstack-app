class APIFeatures {
	constructor(query, queryString) {
		this.query = query
		this.queryString = queryString
	}

    // search method will change the query object
    search() {
        // ?location=new york
        const location = this.queryString.location ?
            {
                address: {
                    $regex: this.queryString.location,
                    $options: 'i'
                }
            } :
            {}
        console.log('location', location)
        // { address: { '$regex': 'new york', '$options': 'i' } }
     
        this.query = this.query.find({...location})
        // console.log('query after', this.query)
        // op: 'find',
        // options: {},
        // _conditions: { address: { '$regex': 'new york', '$options': 'i' } },

        return this
    }

    filter() {
        const queryCopy = { ...this.queryString }
        //console.log('queryCopy bf', queryCopy)
        // { location: 'new york', category: 'Twins' }

        // remove fields from query because location is not a field in the db
        // otherwise we have to query like this: {{DOMAIN}}/api/rooms?address=4667 Bicetown Street, New York, NY, 10004&category=King
        const removeFields = ['location']
        removeFields.forEach(field => delete queryCopy[field])

        //console.log('queryCopy af', queryCopy)
        // { category: 'Twins' }

        this.query = this.query.find(queryCopy)
        return this
    }
}

export default APIFeatures
