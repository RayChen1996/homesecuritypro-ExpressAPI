// controllers/contactFormController.ts
import { Request, Response } from 'express'
import { ContractForm, Modal } from '../models/contractFrom'

let contactForms: ContractForm[] = []

/**
 * @swagger
 * tags:
 *   name: Contact Forms
 *   description: CRUD operations for Contact Forms
 */

export const getContactForms = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'get'
   * #swagger.tags = ['聯絡表單']
   * #swagger.summary = '取得所有聯絡表單'
   * #swagger.responses[200] = {
   *   description: '成功',
   *   schema: {
   *     type: 'array',
   *     items: {
   *       $ref: '#/components/schemas/ContactForm'
   *     }
   *   }
   * }
   */
  res.json(contactForms)
}

export const createContactForm = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'post'
   * #swagger.tags = ['聯絡表單']
   * #swagger.summary = '新增一個聯絡表單'
   * #swagger.parameters['body'] = {
        in: 'body',
        description: '表單內容',
        type: 'object',
        required: true,
        schema: {
          $isPublic: false,
          $HouseSymptoms: {
             _id: "",
              labelName: ""
          },
          Name:"",
          Phone:"",
          address:{
            city:"",
            zone:""
          }
        }
       }
   * #swagger.parameters['header'] = {
   *   in: 'header',
   *   name: 'Authorization',
   *   description: 'Bearer token',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.responses[201] = {
   *   description: '成功',
   *   schema: {
   *     $ref: '#/components/schemas/ContactForm'
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
  const { isPublic, HouseSymptoms, Name, Phone, address } = req.body
  const newContactForm: ContractForm = {
    id: String(contactForms.length + 1),
    isPublic,
    HouseSymptoms,
    Name,
    Phone,
    address,
    createDT: new Date(),
    updateDT: new Date()
  }
  contactForms.push(newContactForm)
  Modal.create(newContactForm)
  res.status(201).json(newContactForm)
}

export const updateContactForm = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'put'
   * #swagger.tags = ['聯絡表單']
   * #swagger.summary = '更新一個聯絡表單'
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
   *   description: '表單 ID',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   description: '更新內容',
   *   required: true,
   *   schema: {
   *     $ref: '#/components/schemas/ContactForm'
   *   }
   * }
   * #swagger.responses[200] = {
   *   description: '成功',
   *   schema: {
   *     $ref: '#/components/schemas/ContactForm'
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
  // const {  } = req.body
  const index = contactForms.findIndex((form) => form.id === id)
  if (index !== -1) {
    contactForms[index] = {
      ...contactForms[index]
    }
    res.json(contactForms[index])
  } else {
    res.status(404).json({ message: 'Form not found' })
  }
}

export const deleteContactForm = (req: Request, res: Response) => {
  /**
   * #swagger.method = 'delete'
   * #swagger.tags = ['聯絡表單']
   * #swagger.summary = '刪除一個聯絡表單'
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
   *   description: '表單 ID',
   *   required: true,
   *   type: 'string'
   * }
   * #swagger.responses[204] = {
   *   description: '成功',
   * }
   */
  const id = req.params.id
  contactForms = contactForms.filter((form) => form.id !== id)
  res.sendStatus(204)
}
