const db = require('../connection');

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
  deleteUser
};


function findUsers(){
    return db('users as u')
    .join('userTypes as t', 'u.authCode', 't.authCodeForUser')
    .select( 'u.name', 't.type_name', 'u.username', 'u.email', 'u.id')
  
}
function findClasses(){
    return db('classes as c')
    .join('intensityLevels as i', 'c.intensityLevel', 'i.id')
    .select('c.name', 'c.type', 'c.startTime', 'c.classDate', 'c.duration', 'c.location', 'c.currentRegistered', 'c.maxClassSize', 'i.level_name', 'c.id', 'c.gender', 'c.instructor')
    .orderBy('classDate')
}

function findClassesBy(filter){
    console.log(filter)
    return db('classes').where(filter)
}
function findUsersBy(filter){
    return db('users').where(filter).orderBy('id')
}

function findUsersById(id){
    return db('users').where({id}).first();
}

function findClassesById(id){
    return db('classes').where({id}).first();
}


async function addUser(user){
    try{
        const [id] = await db('users').insert(user, "id")
        return findUsersById(id)
    } catch(error){
        throw error;
    }
}

async function addClass(newclass){
    try{
        const [id] = await db('classes').insert(newclass, "id")
        return findClassesById(id)
    } catch(error){
        throw error;
    }
}

function updateClass(changes , id){
    return db('classes')
    .where({id})
    .update(changes)
}

function deleteClass(id){
    return db('classes')
    .where({id})
    .del()
}
function deleteUser(id){
    return db('users')
    .where({id})
    .del()
}