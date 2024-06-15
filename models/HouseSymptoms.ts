import mongoose, { Schema, Document } from 'mongoose'
export interface IHouseSymptoms extends Document {
  labelName: string
  createDT: Date
  updateDT: Date
}

const HouseSymptomsSchema: Schema = new Schema({
  labelName: { type: String, required: true },
  createDT: { type: Date, default: Date.now },
  updateDT: { type: Date, default: Date.now }
})

export default mongoose.model<IHouseSymptoms>('HouseSymptoms', HouseSymptomsSchema)
