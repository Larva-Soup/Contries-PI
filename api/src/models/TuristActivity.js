const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('turistActivity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.ENUM('1','2','3','4','5'),
        },
        duration: {
            type: DataTypes.STRING,
            //esto solo es temporal, mientras defino como hacer esta propiedad
        },
        season: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera')
        }
    },{
        timestamps:false,
    })
}