describe('POST /shorten ', () => {
    it('should return 201 with longUrl & shortUrl attrs when correct URL', () => {
        const longUrl = 'https://foobar.quz?a=b&c=d'
        cy.request('post', '/shorten', {
            longUrl,
        }).then(response => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('longUrl', longUrl)
            expect(response.body).to.contains.property('shortUrl')
            expect(response.body.shortUrl).to.contains('https://tier.app')
            expect(response.body).to.contains.property('key')
        })
    })

    it('should return 400 when uncorrect URL', () => {
        const longUrl = 'NOT_AN_URL'
        cy.request(
            { method: 'post', url: '/shorten', failOnStatusCode: false },
            {
                longUrl,
            }
        ).then(response => {
            expect(response.status).to.eq(400)
        })
    })
})

describe('GET /:key', () => {
    it('should return 302 with correct URL', () => {
        const longUrl = 'https://foobar.com/?a=b&c=d'
        cy.request('post', '/shorten', {
            longUrl,
        }).then(resp => {
            const key = resp.body.key
            cy.request({
                method: 'get',
                url: `/${key}`,
                followRedirect: false,
            }).then(response => {
                expect(response.redirectedToUrl).to.eq(longUrl)
            })
        })
    })

    it('should return 400 when uncorrect URL', () => {
        cy.request({
            method: 'get',
            url: `/NOP`,
            failOnStatusCode: false,
        }).then(response => {
            expect(response.status).to.eq(404)
        })
    })
})

describe('Stats', () => {
    //TODO
})
