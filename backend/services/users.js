const userModel = require("../storage/models/user.model.js");
const subscriptionModel = require("../storage/models/subscription.model.js");
const userTypeModel = require("../storage/models/user_type.model.js");
const universityModel = require("../storage/models/university.model.js");
const enarmDateModel = require("../storage/models/enarm_date.model.js");
const careerModel = require("../storage/models/career.model.js");
const userstatusModel = require("../storage/models/user_status.model.js");

async function getAll() {
  const users = await userModel.findAll({
    include: [
      { model: subscriptionModel },
      { model: userTypeModel },
      { model: universityModel },
      { model: enarmDateModel },
      { model: careerModel },
      { model: userstatusModel, as: "userStatus" },
    ],
  });
  return users;
}

async function updateProfile({id, name, last_name, user_type_id, subscription_id, birthdate, status}) {
  let updated = await userModel.update({
    name: name,
    last_name: last_name,
    user_type_id: user_type_id,
    subscription_id: subscription_id,
    birthdate: parseInt(birthdate)
  }, {
    where: {
      id: id
    }
  });

  if (status) {
    userStatus.upsert({
      user_id: id,
      status: status
    });
  }


  return updated == 0 ? false : true;
}

module.exports = {
  getAll,
  updateProfile
}