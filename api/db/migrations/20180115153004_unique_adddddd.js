
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('course', function (table) {
      table.unique(['userId', 'name']);
      table.unique('userId');
      table.unique('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('course', function (table) {
      table.dropUnique(['userId', 'name']);
      table.dropUnique('userId');
      table.dropUnique('name');
    })
  ])
};

