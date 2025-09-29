import { Schema, model } from "mongoose";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
  {
    timestamps: true,
    // Configurar índices para optimizar consultas de categorías
    indexes: [
      { name: 1 },
      { createdAt: -1 }
    ]
  }
);

// ! FALTA COMPLETAR ACA
// Virtual para populate inverso con assets - relación N:M Asset ↔ Category
CategorySchema.virtual('assets', {
  ref: 'Asset',
  localField: '_id',
  foreignField: 'categories'
});

// Middleware para eliminación en cascada - AssetCategory
CategorySchema.pre('findOneAndDelete', async function () {
  const categoryId = this.getQuery()._id;
  // Importación dinámica para evitar dependencias circulares
  const { AssetModel } = await import('./asset.model.js');

  // Remover la categoría de todos los assets que la referencian
  await AssetModel.updateMany(
    { categories: categoryId },
    { $pull: { categories: categoryId } }
  );

  console.log(`Categoría ${categoryId} eliminada y referencias actualizadas en assets`);
});

CategorySchema.pre('deleteOne', async function () {
  const categoryId = this.getQuery()._id;
  const { AssetModel } = await import('./asset.model.js');

  await AssetModel.updateMany(
    { categories: categoryId },
    { $pull: { categories: categoryId } }
  );

  console.log(`Categoría ${categoryId} eliminada y referencias actualizadas en assets`);
});

// Asegurar que los virtuals se incluyan en JSON
CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

export const CategoryModel = model("Category", CategorySchema);
