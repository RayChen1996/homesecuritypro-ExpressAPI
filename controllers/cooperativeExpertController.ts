// controllers/cooperativeExpertController.ts
import { Request, Response } from 'express'
import { CooperativeExpert } from '../models/cooperativeExpert'

let experts: CooperativeExpert[] = []

// Get all experts
export const getCooperativeExperts = (req: Request, res: Response) => {
  /**
     * #swagger.tags = ['合作專家']
     * #swagger.description = '取得所有合作專家'
     * #swagger.security = [{
        token: []
       }]
    * #swagger.parameters['header'] = {
        in: 'header',
        name: 'authorization',
        description: 'Bearer token',
        required: true,
        type: 'string'
      }
     * #swagger.responses[200] = {
        description: '登入成功',
        schema: {
          "status": "success",
          "message": "登入成功"
        },
       }
     * #swagger.responses[401] = {
        description: '登入失敗',
        schema: {
          "status": "error",
          "message": "身分驗證失敗，請重新登入"
        },
       }
     *
     */
  res.json(experts)
}

// Create an expert
export const createCooperativeExpert = (req: Request, res: Response) => {
  /**
     * #swagger.tags = ['合作專家']
     * #swagger.description = '建立合作專家'
     * #swagger.security = [{
        token: []
       }]
    * #swagger.parameters['header'] = {
        in: 'header',
        name: 'authorization',
        description: 'Bearer token',
        required: true,
        type: 'string'
      }
     * #swagger.responses[200] = {
        description: '登入成功',
        schema: {
          "status": "success",
          "message": "登入成功"
        },
       }
     * #swagger.responses[401] = {
        description: '登入失敗',
        schema: {
          "status": "error",
          "message": "身分驗證失敗，請重新登入"
        },
       }
     *
     */
  const { componay, experience, serviceItem, picture } = req.body
  const newExpert: CooperativeExpert = {
    id: String(experts.length + 1),
    componay,
    experience,
    serviceItem,
    picture
  }
  experts.push(newExpert)
  res.status(201).json(newExpert)
}

// Update an expert
export const updateCooperativeExpert = (req: Request, res: Response) => {
  /**
     * #swagger.tags = ['合作專家']
     * #swagger.description = '更新合作專家'
     * #swagger.security = [{
        token: []
       }]
    * #swagger.parameters['header'] = {
        in: 'header',
        name: 'authorization',
        description: 'Bearer token',
        required: true,
        type: 'string'
      }
     * #swagger.responses[200] = {
        description: '登入成功',
        schema: {
          "status": "success",
          "message": "登入成功"
        },
       }
     * #swagger.responses[401] = {
        description: '登入失敗',
        schema: {
          "status": "error",
          "message": "身分驗證失敗，請重新登入"
        },
       }
     *
     */
  const id = req.params.id
  const { componay, experience, serviceItem, picture } = req.body
  const index = experts.findIndex((expert) => expert.id === id)
  if (index !== -1) {
    experts[index] = {
      ...experts[index],
      componay,
      experience,
      serviceItem,
      picture
    }
    res.json(experts[index])
  } else {
    res.status(404).json({ message: 'Expert not found' })
  }
}

// Delete an expert
export const deleteCooperativeExpert = (req: Request, res: Response) => {
  /**
     * #swagger.tags = ['合作專家']
     * #swagger.description = '刪除合作專家'
     * #swagger.security = [{
        token: []
       }]
    * #swagger.parameters['header'] = {
        in: 'header',
        name: 'authorization',
        description: 'Bearer token',
        required: true,
        type: 'string'
      }
     * #swagger.responses[200] = {
        description: '登入成功',
        schema: {
          "status": "success",
          "message": "登入成功"
        },
       }
     * #swagger.responses[401] = {
        description: '登入失敗',
        schema: {
          "status": "error",
          "message": "身分驗證失敗，請重新登入"
        },
       }
     *
     */
  const id = req.params.id
  experts = experts.filter((expert) => expert.id !== id)
  res.sendStatus(204)
}
