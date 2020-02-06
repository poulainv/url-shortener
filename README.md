# Shortener URL

## Stack

- Express
- Prisma2
- Cypress
- Typescript

## Documentation

This API provides endpoint to shorten URL. 
Its uses [Hashids](https://github.com/niieani/hashids.js) to generate YouTube-like ids from auto incremental database id number. [Here](src/routes/index.ts), you can see how those string small-ids are encoded & decoded.


`schema.prisma` defines basic model:

- `Url` stores url
- `View` stores viewing stats


⚠️ This is not production ready ⚠️

### 1. Shorten URL

`POST /shortener`

**body**
```
{
    "longUrl": "https://domain.com/mylongurlwithparams?foo=bar"
}
```

**result**
```
{
    "longUrl": "https://domain.com/mylongurlwithparams?foo=bar"
    "shortUrl": "https://tier.app/bGv5rc",
    "key": "bGv5rc"
}
```


### 2. Get redirection

`GET /:key` return 302 redirection when URL exist, else 404

## Installation

```
npm install
prisma2 migrate save --experimental
prisma2 migrate up --experimental
npm run dev
```


## Test

```
./node_modules/.bin/cypress open
```