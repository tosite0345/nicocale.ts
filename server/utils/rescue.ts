import { Request, Response, NextFunction } from 'express'

/**
 * Promise で書かれた Express のルーティングをラップしエラーハンドラーで検知できるようにします
 * @link http://expressjs.com/ja/advanced/best-practice-performance.html#promises
 */
type routeFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>
export const rescue = (fn: routeFunction): routeFunction => (req, res, next) => fn(req, res, next).catch(next)
