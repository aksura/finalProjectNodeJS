const { Op } = require("sequelize");

function queryHandler(query) {
    let page = 0;//default
    let size = 6;//default

    let where = {}

    for (let key in query) {
        if (key === "page") {
            page = query.page;
        } else if (key === "size") {
            size = query.size
        } else if (isNaN(query[key])) {
            where[key] = {
                [Op.like]: `%${query[key]}%`
            }
        } else {
            where[key] = query[key]
        }
    }


    let result = {
        where,
        limit: size,
        offset: page*size
    }
    
    return result;
}

module.exports = queryHandler;

