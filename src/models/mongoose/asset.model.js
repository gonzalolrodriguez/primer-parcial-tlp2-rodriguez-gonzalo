import { Schema, model } from "mongoose";

// TODO: completar relaciones embebidas y referenciadas

const AssetSchema = new Schema(
  {
    inventoryNumber: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    model: { type: String, required: true, minlength: 2, maxlength: 100 },
    status: {
      type: String,
      enum: ["good", "regular", "bad", "out_of_service"],
      default: "good",
    },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true, min: 0 },
    // ! FALTA COMPLETAR ACA
    responsible: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }]
  },
  {
    timestamps: true,
    // Configurar índices para optimizar consultas del patrimonio judicial
    indexes: [
      { inventoryNumber: 1 },
      { responsible: 1 },
      { categories: 1 },
      { status: 1 },
      { acquisitionDate: -1 }
    ]
  }
);

// Middleware para eliminación en cascada - AssetCategory
AssetSchema.pre('findOneAndDelete', async function () {
  // Al eliminar un Asset, se eliminan automáticamente las asociaciones
  // ya que categories es un array embebido que se elimina con el documento
  console.log('Asset eliminado - asociaciones categories eliminadas automáticamente');
});

AssetSchema.pre('deleteOne', async function () {
  console.log('Asset eliminado - asociaciones categories eliminadas automáticamente');
});

export const AssetModel = model("Asset", AssetSchema);
