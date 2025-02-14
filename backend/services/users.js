const userModel = require("../storage/models/user.model.js");
const userStatus = require("../storage/models/user_status.model.js");

async function getAll() {
  const users = await userModel.findAll()
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