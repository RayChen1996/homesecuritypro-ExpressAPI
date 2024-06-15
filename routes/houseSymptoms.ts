// routes/houseSymptoms.ts
import express from 'express'
import {
  getHouseSymptoms,
  createHouseSymptoms,
  updateHouseSymptoms,
  deleteHouseSymptoms
} from '../controllers/houseSymptomsController'

const router = express.Router()

router.get('/', getHouseSymptoms)

router.post('/', createHouseSymptoms)

router.put('/:id', updateHouseSymptoms)

router.delete('/:id', deleteHouseSymptoms)

export default router
