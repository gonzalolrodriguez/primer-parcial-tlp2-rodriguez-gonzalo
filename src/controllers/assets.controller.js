import { AssetModel } from "../models/mongoose/asset.model.js";

export const createAsset = async (req, res) => {
  try {
    // TODO: crear asset (usuario autenticado)
    const {
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      responsible,
      categories
    } = req.body;

    const asset = new AssetModel({
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      responsible,
      categories
    });

    await asset.save();

    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)
    const assets = await AssetModel.find()
      .populate('responsible', '-password')
      .populate('categories');

    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)
    const userId = req.user.id;

    const myAssets = await AssetModel.find({ responsible: userId })
      .populate('categories');

    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)
    const { id } = req.params;
    const userId = req.user.id;

    const asset = await AssetModel.findById(id);
    if (!asset) {
      return res.status(404).json({ msg: "Asset no encontrado" });
    }

    // Verificar que el usuario sea el responsable del asset
    if (asset.responsible.toString() !== userId) {
      return res.status(403).json({ msg: "No tienes permisos para eliminar este asset" });
    }

    await AssetModel.findByIdAndDelete(id);

    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
