import { Router } from "express";
import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getMyAssets,
} from "../controllers/assets.controller.js";
import { createAssetValidation } from "../middlewares/validations/asset.validations.js";
import { validator } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { responsibleMiddleware } from "../middlewares/responsible.middleware.js";

export const assetRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// * crear un recurso (usuario autenticado)
assetRoutes.post("/assets", authMiddleware, createAssetValidation, validator, createAsset);

// * traer todos los recursos (usuario autenticado que sea admin)
assetRoutes.get("/assets", authMiddleware, adminMiddleware, getAllAssets);

// * traer mis recursos (usuario autenticado que sea responsible)
assetRoutes.get("/assets/my-assets", authMiddleware, getMyAssets);

// * eliminar un recurso por id (usuario autenticado que sea responsible)
assetRoutes.delete("/assets/:id", authMiddleware, responsibleMiddleware, deleteAsset);
