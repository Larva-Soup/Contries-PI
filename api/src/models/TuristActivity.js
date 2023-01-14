const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('turistActivity', {
        id: {
            type: DataTypes.UUID,
            default: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.TINYINT(1),
        },
        duration: {
            type: DataTypes.STRING,
            //esto solo es temporal, mientras defino como hacer esta propiedad
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        }
    })
}