exports.up = function (knex, Promise) {

  return Promise.all([

    knex.schema.createTable('user', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('image')
      table.string('email')
      table.string('facebookId')
      table.string('gender')
      table.string('location')
      table.string('city')
      table.string('province')
      table.string('country')
      table.timestamps(true, true);
    }),

    knex.schema.createTable('course', function (table) {
      table.increments('id').primary();
      table.integer('userId')
      .references('id')
      .inTable('user');
      table.timestamps(true, true);
      table.string('name');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('course')
  ])
};