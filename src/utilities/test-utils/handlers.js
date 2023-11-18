
import { subredditMockResponse } from './subredditMockResponse'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
const handlers = [
    rest.get("https://www.reddit.com/subreddits.json?limit=5", async (req, res, ctx) => {
        
        return res(
            ctx.status(200),
            ctx.json(subredditMockResponse)
        )
    })
]

export const server = setupServer(...handlers)