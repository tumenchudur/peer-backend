import { NextFunction, Request, Response } from 'express'

async function paginate(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { limit, page }: { limit?: string; page?: string } = req.query

    delete req.query.page
    delete req.query.limit

    req.pagination = {
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1
    }

    req.pagination.offset = req.pagination.limit * (req.pagination.page - 1)

    next()
}

export { paginate }
