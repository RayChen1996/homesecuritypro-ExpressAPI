// controllers/recommendationArticleController.ts
import { Request, Response } from 'express'
import { RecommendationArticle } from '../models/recommendationArticle'

let articles: RecommendationArticle[] = []

/**
 * @swagger
 * tags:
 *   name: Recommendation Articles
 *   description: CRUD operations for Recommendation Articles
 */

export const getRecommendationArticles = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'get'
   * #swagger.tags = ['推薦文章']
   * #swagger.summary = '取得所有推薦文章'
   * #swagger.responses[200] = {
   *   description: '成功',
   *   schema: {
   *     type: 'array',
   *     items: {
   *       $ref: '#/components/schemas/RecommendationArticle'
   *     }
   *   }
   * }
   */

  res.json(articles)
}

export const createRecommendationArticle = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'post'
   * #swagger.tags = ['推薦文章']
   * #swagger.summary = '新增一篇推薦文章'
   * #swagger.parameters['header'] = {
   *   in: 'header',
   *   name: 'Authorization',
   *   description: 'Bearer token',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   description: '文章內容',
   *   required: true,
   *   schema: {
   *     $ref: '#/components/schemas/RecommendationArticle'
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: '成功',
   *   schema: {
   *     $ref: '#/components/schemas/RecommendationArticle'
   *   }
   * }
   * #swagger.responses[400] = {
   *   description: '錯誤',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       status: { type: 'string', example: 'error' },
   *       message: { type: 'string', example: '錯誤訊息' }
   *     }
   *   }
   * }
   */
  const { tags, articleLink, description, articleName } = req.body
  const newArticle: RecommendationArticle = {
    id: String(articles.length + 1),
    tags,
    createDT: new Date(),
    updateDT: new Date(),
    articleLink,
    description,
    articleName
  }
  articles.push(newArticle)
  res.status(201).json(newArticle)
}

export const updateRecommendationArticle = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'put'
   * #swagger.tags = ['推薦文章']
   * #swagger.summary = '更新一篇推薦文章'
   * #swagger.parameters['header'] = {
   *   in: 'header',
   *   name: 'Authorization',
   *   description: 'Bearer token',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.parameters['path'] = {
   *   in: 'path',
   *   name: 'id',
   *   description: '文章 ID',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   description: '更新內容',
   *   required: true,
   *   schema: {
   *     $ref: '#/components/schemas/RecommendationArticle'
   *   }
   * }
   * #swagger.responses[200] = {
   *   description: '成功',
   *   schema: {
   *     $ref: '#/components/schemas/RecommendationArticle'
   *   }
   * }
   * #swagger.responses[400] = {
   *   description: '錯誤',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       status: { type: 'string', example: 'error' },
   *       message: { type: 'string', example: '錯誤訊息' }
   *     }
   *   }
   * }
   */
  const id = req.params.id
  const { tags, articleLink, description, articleName } = req.body
  const index = articles.findIndex((article) => article.id === id)
  if (index !== -1) {
    articles[index] = {
      ...articles[index],
      tags,
      updateDT: new Date(),
      articleLink,
      description,
      articleName
    }
    res.json(articles[index])
  } else {
    res.status(404).json({ message: 'Article not found' })
  }
}

export const deleteRecommendationArticle = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'delete'
   * #swagger.tags = ['推薦文章']
   * #swagger.summary = '刪除一篇推薦文章'
   * #swagger.parameters['header'] = {
   *   in: 'header',
   *   name: 'Authorization',
   *   description: 'Bearer token',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.parameters['path'] = {
   *   in: 'path',
   *   name: 'id',
   *   description: '文章 ID',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.responses[204] = {
   *   description: '成功',
   * }
   */

  const id = req.params.id
  articles = articles.filter((article) => article.id !== id)
  res.sendStatus(204)
}
