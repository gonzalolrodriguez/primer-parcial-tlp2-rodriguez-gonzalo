import { DataTypes } from "sequelize";
// import sequelize from '../config/database.js'; // Descomentar cuando se configure la conexión

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
// AssetCategoryModel.belongsTo(AssetModel, { foreignKey: 'assetId', as: 'asset' });
// AssetCategoryModel.belongsTo(CategoryModel, { foreignKey: 'categoryId', as: 'category' });

// Índices para optimizar consultas de la tabla intermedia
AssetCategoryModel.addHook('afterSync', () => {
  AssetCategoryModel.addIndex({
    fields: ['assetId', 'categoryId'],
    unique: true,
    name: 'asset_category_unique_pair'
  });
  AssetCategoryModel.addIndex({
    fields: ['assetId'],
    name: 'asset_category_asset_id_index'
  });
  AssetCategoryModel.addIndex({
    fields: ['categoryId'],
    name: 'asset_category_category_id_index'
  });
});

// Configuración de timestamps para auditoría
AssetCategoryModel.addHook('afterSync', () => {
  console.log('Tabla AssetCategory sincronizada - Sistema de Patrimonio Judicial');
});
