import { CategoryModel } from "../models/mongoose/category.model.js";
import { AssetModel } from "../models/mongoose/asset.model.js";

export const createCategory = async (req, res) => {
  try {
    // TODO: crear category (solo admin)
    const { name, description } = req.body;

    const category = new CategoryModel({
      name,
      description
    });

    await category.save();

    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.find()
      .populate('assets');

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const { id } = req.params;

    // Verificar que el ID sea válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "ID de categoría inválido" });
    }

    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    // Actualizar assets que referencian esta categoría (remover la referencia)
    await AssetModel.updateMany(
      { categories: id },
      { $pull: { categories: id } }
    );

    // Eliminar la categoría
    await CategoryModel.findByIdAndDelete(id);

    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
