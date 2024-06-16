// controllers/houseSymptomsController.ts
import { Request, Response, NextFunction } from 'express'
import HouseSymptoms from '../models/HouseSymptoms'

const getHouseSymptoms = async (req: Request, res: Response, next: NextFunction) => {
  /**
     * #swagger.tags = ['屋況徵狀列表']
     * #swagger.description = '首頁取得屋況徵狀'
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
  try {
    const houseSymptoms = await HouseSymptoms.find()
    res.status(200).json({ code: 'success', data: houseSymptoms })
  } catch (err) {
    next(err)
  }
}

const createHouseSymptoms = async (req: Request, res: Response, next: NextFunction) => {
  /**
     * #swagger.tags = ['屋況徵狀列表']
     * #swagger.description = '新增屋況徵狀'
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
  try {
    const { labelName } = req.body
    const newHouseSymptoms = new HouseSymptoms({ labelName })
    await newHouseSymptoms.save()
    res.status(201).json({ code: 'success', data: newHouseSymptoms })
  } catch (err) {
    next(err)
  }
}

const updateHouseSymptoms = async (req: Request, res: Response, next: NextFunction) => {
  /**
     * #swagger.tags = ['屋況徵狀列表']
     * #swagger.description = '更新屋況徵狀'
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
  try {
    const { id } = req.params
    const { labelName } = req.body
    const updatedHouseSymptoms = await HouseSymptoms.findByIdAndUpdate(
      id,
      { labelName, updateDT: new Date() },
      { new: true }
    )
    if (!updatedHouseSymptoms) {
      return res.status(404).json({ code: 'error', msg: '找不到此房屋徵狀' })
    }
    res.status(200).json({ code: 'success', data: updatedHouseSymptoms })
  } catch (err) {
    next(err)
  }
}

const deleteHouseSymptoms = async (req: Request, res: Response, next: NextFunction) => {
  /**
     * #swagger.tags = ['屋況徵狀列表']
     * #swagger.description = '刪除屋況徵狀'
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
  try {
    const { id } = req.params
    const deletedHouseSymptoms = await HouseSymptoms.findByIdAndDelete(id)
    if (!deletedHouseSymptoms) {
      return res.status(404).json({ code: 'error', msg: '找不到此房屋徵狀' })
    }
    res.status(200).json({ code: 'success', data: deletedHouseSymptoms })
  } catch (err) {
    next(err)
  }
}

export { getHouseSymptoms, createHouseSymptoms, updateHouseSymptoms, deleteHouseSymptoms }
