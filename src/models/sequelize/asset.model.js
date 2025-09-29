import { DataTypes } from "sequelize";
// import sequelize from '../config/database.js'; // Descomentar cuando se configure la conexión

export const AssetModel = sequelize.define("Asset", {
  inventory_number: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: { type: DataTypes.STRING(500), allowNull: false },
  brand: { type: DataTypes.STRING(100), allowNull: false },
  model: { type: DataTypes.STRING(100), allowNull: false },
  status: {
    type: DataTypes.ENUM("good", "regular", "bad", "out_of_service"),
    allowNull: false,
    defaultValue: "good",
  },
  acquisition_date: { type: DataTypes.DATE, allowNull: false },
  acquisition_value: { type: DataTypes.DECIMAL, allowNull: false },
});

// TODO: Relación muchos a uno con User (muchos Assets pueden tener un mismo responsable)
// * 1:N User → Asset (responsible)
// * 'assets' (User) y 'responsible' (Asset)
// ! FALTA COMPLETAR ACA
// AssetModel.belongsTo(UserModel, { foreignKey: 'responsibleId', as: 'responsible' });

// TODO: Relación muchos a muchos con Category mediante AssetCategory
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA
// AssetModel.belongsToMany(CategoryModel, {
//   through: AssetCategoryModel,
//   foreignKey: 'assetId',
//   otherKey: 'categoryId',
//   as: 'categories'
// });

// Índices para optimizar consultas del patrimonio judicial
AssetModel.addHook('afterSync', () => {
  AssetModel.addIndex({
    fields: ['inventory_number'],
    unique: true,
    name: 'asset_inventory_number_unique'
  });
  AssetModel.addIndex({
    fields: ['responsibleId'],
    name: 'asset_responsible_id_index'
  });
  AssetModel.addIndex({
    fields: ['status'],
    name: 'asset_status_index'
  });
  AssetModel.addIndex({
    fields: ['acquisition_date'],
    name: 'asset_acquisition_date_index'
  });
});

// Hook para eliminación en cascada de AssetCategory
AssetModel.addHook('beforeDestroy', async (asset, options) => {
  // Al eliminar un Asset, eliminar todas las asociaciones AssetCategory
  await AssetCategoryModel.destroy({
    where: { assetId: asset.id },
    transaction: options.transaction
  });
  console.log(`Asset ${asset.id} eliminado - asociaciones AssetCategory eliminadas`);
});
