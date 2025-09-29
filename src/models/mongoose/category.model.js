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
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA
// Virtual para populate inverso con assets
CategorySchema.virtual('assets', {
  ref: 'Asset',
  localField: '_id',
  foreignField: 'categories'
});

// Asegurar que los virtuals se incluyan en JSON
CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

export const CategoryModel = model("Category", CategorySchema);
