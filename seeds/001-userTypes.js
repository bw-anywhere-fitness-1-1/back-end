exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('userTypes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('userTypes').insert([
        {type_name: 'Client', authCodeForUser: '1'},
        {type_name: 'Instructor', authCodeForUser: '2'},
      ]);
    });
};
