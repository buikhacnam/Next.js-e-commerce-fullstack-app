class APIFeatures {
	constructor(query, queryString) {
		this.query = query
		this.queryString = queryString
	}

    // search method will change the query object by using fields that are not in the db (ex: location)
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

    // filter the query object according to database fields
    filter() {
        const queryCopy = { ...this.queryString }
        //console.log('queryCopy bf', queryCopy)
        // { location: 'new york', category: 'Twins' }

        // remove fields from query because location is not a field in the db
        // otherwise we have to query like this: {{DOMAIN}}/api/rooms?address=4667 Bicetown Street, New York, NY, 10004&category=King
        const removeFields = ['location', 'page']
        removeFields.forEach(field => delete queryCopy[field])

        //console.log('queryCopy af', queryCopy)
        // { category: 'Twins' }

        this.query = this.query.find(queryCopy)
        return this
    }

    // caluculate the total of rooms will be skipped and limit results per page
    pagination(resPerPage) {
        // resPerPage: number of results per page
        // currentPage: current page number: page 2 -> domain.com/api/rooms?page=2
        const currentPage = this.queryString.page * 1 || 1
        // number of skipping page: 
        // for example: resPerPage = 5, and the currentPage = 4, then we'll skip the first 5 * (4 - 1) = 15 rooms
        const skip = (currentPage - 1) * resPerPage
        this.query = this.query.skip(skip).limit(resPerPage)

        return this
    }
}

export default APIFeatures
