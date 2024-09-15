const knex = require("./knex");
const { SHOW_DELETED } = require("../const");

const Category = {
  // Kategori Listeleme
  getAll: (query) => {
    const { showDeleted } = query;
    if (showDeleted === SHOW_DELETED.TRUE) {
      return knex("categories");
    } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
      return knex("categories").whereNotNull("deleted_at");
    } else {
      return knex("categories").whereNull("deleted_at");
    }
  },
  // Kategori Görüntüleme
  getById: (id) => {
    return knex("categories").where({ id }).first();
  },
  // Kategori Oluşturma/Ekleme
  create: (category) => {
    return knex("categories").insert(category).returning("*");
  },
  // Kategori Güncelleme
  update: (id, category) => {
    return knex("categories").where({ id }).update(category).returning("*");
  },
  // Kategori Silme
  softDelete: (id) => {
    return knex("categories")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
  },
};

module.exports = Category;
