
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('course', function (table) {
      table.dropUnique('userId');
      table.dropUnique('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('course', function (table) {
      table.unique('userId');
      table.unique('name');
    })
  ])
};

