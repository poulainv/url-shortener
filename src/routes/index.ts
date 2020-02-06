import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { isWebUri } from 'valid-url'
import Hashids from 'hashids/cjs'
import { BASE } from '../config/constants'

const client = new PrismaClient()
const hashids = new Hashids('tier', 6)

export const router = express.Router({
    strict: true,
})

router.post('/shorten', async (req: Request, res: Response) => {
    const longUrl = req.body.longUrl
    if (isWebUri(longUrl)) {
        const entry = await client.url.create({ data: { longUrl } })
        const key = hashids.encode(entry.id)
        res.status(201).json({ longUrl, shortUrl: `${BASE}/${key}`, key })
    } else {
        res.status(400).json({ error: 'Not an URL' })
    }
})

router.get('/:key', async (req: Request, res: Response) => {
    const key = req.params.key
    const id = hashids.decode(key)[0] as number // FIXME why lib wants to return BigInt

    if (!id) {
        res.status(404).json('Not Found')
        return
    }

    const entry = await client.url.findOne({
        select: { longUrl: true },
        where: { id },
    })

    if (entry?.longUrl) {
        res.redirect(entry.longUrl)

        // Dont do that in production!
        await client.view.create({
            data: {
                url: { connect: { id } },
            },
        })
    } else {
        res.status(404).json('Not Found')
    }
})
