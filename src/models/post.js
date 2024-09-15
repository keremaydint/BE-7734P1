const knex = require("./knex");
const { SHOW_DELETED, POST_STATUS } = require("../const");

const Post = {
  getAll: (query_string) => {
    const { category, status, showDeleted } = query_string;
    const query = knex("posts");
    if (showDeleted === SHOW_DELETED.FALSE) {
      query.whereNull("deleted_at");
    } else if (showDeleted === SHOW_DELETED.ONLY_DELETED) {
      query.whereNotNull("deleted_at");
    } else if (showDeleted !== SHOW_DELETED.TRUE) {
      query.whereNotNull("deleted_at");
    }

    if (category) {
      query.where({ category_id: category });
    }

    if (status === POST_STATUS.PUBLISHED) {
      query.whereNotNull("published_at");
    } else if (status === POST_STATUS.DRAFT) {
      query.whereNull("published_at");
    }

    return query;
  },
  getById: (id) => {
    return knex("posts").whereNull("deleted_at").where({ id }).first();
  },
  create: (post) => {
    return knex("posts").insert(post).returning("*");
  },

  update: (id, post) => {
    return knex("posts")
      .whereNull("deleted_at")
      .where({ id })
      .first()
      .update(post)
      .returning("*");
  },
  delete: (id) => {
    return knex("posts")
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning("*");
  },
};

module.exports = Post;
