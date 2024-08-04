'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    train_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seat_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Booking;
};
