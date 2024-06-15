import mongoose, { Schema } from 'mongoose'
import { IHouseSymptoms } from './HouseSymptoms'
export interface ContractForm {
  id: string
  isPublic: boolean
  HouseSymptoms: IHouseSymptoms[]
  Name: string
  Phone: string
  address: {
    city: string
    zone: string
  }
  createDT: Date
  updateDT: Date
}

export const ContractFormSchema: Schema = new Schema({
  isPublic: { type: Boolean },
  HouseSymptoms: [],
  Phone: { type: String },
  address: {
    city: { type: String, required: true },
    zone: { type: String, required: true }
  },
  Name: { type: String, required: true },
  createDT: { type: Date, default: Date.now },
  updateDT: { type: Date, default: Date.now }
})

export const Modal = mongoose.model<IHouseSymptoms>('ContractForm', ContractFormSchema)
