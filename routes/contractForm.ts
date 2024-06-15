// routes/houseSymptoms.ts
import express from 'express'
import {
  createContactForm,
  deleteContactForm,
  getContactForms,
  updateContactForm
} from '../controllers/contactFormController'

const router = express.Router()

router.get('/', getContactForms)

router.post('/', createContactForm)

router.put('/:id', updateContactForm)

router.delete('/:id', deleteContactForm)

export default router
