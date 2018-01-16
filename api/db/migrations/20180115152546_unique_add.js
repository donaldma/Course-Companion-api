
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('course', function (table) {
      table.integer('userId')
      .references('id')
      .inTable('user');
      table.string('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.table('course', function (table) {
      table.dropColumn('userId');
      table.dropColumn('name');
    })
  ])
};
