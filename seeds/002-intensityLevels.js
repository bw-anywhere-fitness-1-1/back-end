
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('intensityLevels').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('intensityLevels').insert([
        {level_name: 'Beginner'},
        {level_name: 'Intermediate'},
        {level_name: 'Advanced'},
        
      ]);
    });
};
