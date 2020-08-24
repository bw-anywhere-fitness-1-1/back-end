
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "sallyBird", password : "password", name : "Sally", email : "sally@bird.com", authCode: 111},
        {username: "joey223", password : "password", name : "Joeseph", email : "joey@bird.com", authCode: 111},
        {username: "TerrannceManly", password : "password", name : "Terry", email : "terry@bird.com", authCode:222},
        {username: "JeremyJJ", password : "password", name : "Jeremy", email : "terry@bird.com", authCode:222}
  
      ]);
    });
};
