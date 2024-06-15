// routes/cooperativeExperts.ts
import express from 'express'
import {
  getCooperativeExperts,
  createCooperativeExpert,
  updateCooperativeExpert,
  deleteCooperativeExpert
} from '../controllers/cooperativeExpertController'

const router = express.Router()

router.get('/', getCooperativeExperts)

router.post('/', createCooperativeExpert)

router.put('/:id', updateCooperativeExpert)

router.delete('/:id', deleteCooperativeExpert)

export default router
