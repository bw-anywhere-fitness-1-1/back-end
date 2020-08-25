const db = require("../connection");

module.exports = {
  addUser,
  findUsers,
  findClassesBy,
  findUsersById,
  addClass,
  findUsersBy,
  findClasses,
  updateClass,
  deleteClass,
  findClassesById,
  findClassesSavedByUser,
  saveClassToUser,
  deleteSavedClass,
  deleteUser,
};

function findUsers() {
  return db("users as u")
    .join("userTypes as t", "u.authCode", "t.authCodeForUser")
    .select("u.name", "t.type_name", "u.username", "u.email", "u.id");
}
function findClasses() {
  return db("classes as c")
    .join("intensityLevels as i", "c.intensityLevel", "i.id")
    .select(
      "c.name",
      "c.type",
      "c.startTime",
      "c.classDate",
      "c.duration",
      "c.location",
      "c.currentRegistered",
      "c.maxClassSize",
      "i.level_name",
      "c.id",
      "c.gender",
      "c.instructor"
    )
    .orderBy("classDate");
}

//  TODO: add in saved_class_id to response
//  --> ...adding c.id w/o s.userId & c.* returns correct id ...
function findClassesSavedByUser(id) {
  return db("savedClasses as s")
    .join("classes as c", "c.id", "s.classesId")
    .select("s.userId", "s.classesId as class_id", "c.*")
    .where({ userId: id });
}

function findClassesBy(filter) {
  return db("classes").where(filter);
}
function findUsersBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findUsersById(id) {
  return db("users").where({ id }).first();
}

function findClassesById(id) {
  return db("classes").where({ id }).first();
}

async function addUser(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findUsersById(id);
  } catch (error) {
    throw error;
  }
}

async function addClass(newclass) {
  try {
    const [id] = await db("classes").insert(newclass, "id");
    return findClassesById(id);
  } catch (error) {
    throw error;
  }
}
async function saveClassToUser(save_class_details) {
  try {
    const [id] = await db("savedClasses").insert(save_class_details, "id");
    return findClassesSavedByUser(save_class_details.userId);
  } catch (error) {
    throw error;
  }
}

function updateClass(changes, id) {
  return db("classes").where({ id }).update(changes);
}

function deleteClass(id) {
  return db("classes").where({ id }).del();
}
function deleteUser(id) {
  return db("users").where({ id }).del();
}

function deleteSavedClass(savedDetails) {
  return db("savedClasses")
    .where({
      userId: savedDetails.user_id,
      classesId: savedDetails.class_id,
    })
    .del();
}
