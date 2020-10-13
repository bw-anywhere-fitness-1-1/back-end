exports.up = function (knex) {
  return knex.schema
    .createTable("userTypes", (tbl) => {
      tbl.increments();
      tbl.string("type_name", 128).notNullable().unique();
      tbl.string("authCodeForUser").notNullable();
    })
    .createTable("intensityLevels", (tbl) => {
      tbl.increments();
      tbl.string("level_name", 128).notNullable().unique();
    })
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 265).notNullable();
      tbl.string("name", 128);
      tbl.string("email", 12);
      tbl
        .string("authCode")
        .defaultTo('1')
        .unsigned()
        .references("userTypes.authCodeForUser");
    })
    .createTable("instructors", (tbl) => {
      tbl.increments();
      tbl
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("userTypeId")
        .unsigned()
        .notNullable()
        .references("users.userType")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("classes", (tbl) => {
      tbl.increments();
      tbl.string("name", 128).notNullable();
      tbl.string("type", 128).notNullable();
      tbl.string("startTime", 128).notNullable();
      tbl.date("classDate", 128).notNullable();
      tbl.string("duration", 128).notNullable();
      tbl
        .integer("intensityLevel")
        .unsigned()
        .notNullable()
        .references("intensityLevels.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.string("location", 128).notNullable();
      tbl.decimal("currentRegistered", 128).notNullable();
      tbl.decimal("maxClassSize", 120).notNullable();
      tbl.string("Instructor", 128).notNullable();
      tbl.string("Gender", 128).notNullable();
    })
    .createTable("savedClasses", (tbl) => {
      tbl.increments();
      tbl
        .integer("userId")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("classesId")
        .unsigned()
        .notNullable()
        .references("classes.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("userTypes")
    .dropTableIfExists("intensityLevels")
    .dropTableIfExists("users")
    .dropTableIfExists("instructors")
    .dropTableIfExists("clients")
    .dropTableIfExists("classes")
    .dropTableIfExists("savedClasses");
};
