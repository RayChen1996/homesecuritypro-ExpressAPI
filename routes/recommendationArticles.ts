// routes/recommendationArticles.ts
import express from 'express'
import {
  getRecommendationArticles,
  createRecommendationArticle,
  updateRecommendationArticle,
  deleteRecommendationArticle
} from '../controllers/recommendationArticleController'

const router = express.Router()

router.get('/', getRecommendationArticles)

router.post('/', createRecommendationArticle)

router.put('/:id', updateRecommendationArticle)

router.delete('/:id', deleteRecommendationArticle)

export default router
