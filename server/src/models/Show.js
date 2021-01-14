const Model = require("./Model")
const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["title"],
  identifiers: ["id"]
})

class Show extends unique(Model) {
  static get tableName() {
    return "shows"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "premiereYear"],
      properties: {
        title: { type: "string" },
        network: { type: "string" },
        premiereYear: { type: ["string", "integer"] },
        description: { type: "string" },
        rating: { type: ["integer", "string"] }
      }
    }
  }
}

module.exports = Show
