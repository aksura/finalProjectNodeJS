function errorHandler(err, req, res, next) {
    // console.log(err, "ini error");
    let code = err.code;
    let message = [];


    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        code = 400

        err.errors.forEach(e => {
            message.push(e.message)
        })
    } else if (code === 400) {
        message.push("Bookmark had been added")
    } else if (code === 404) {
        message.push("Error not Found")
    } else if (code === 401) {
        message.push(err.message)

    } else if (code === 403) {
        message.push(err.message)

    } else {
        code = 500;
        message.push(err);
        message.push("Internal server error");
    }

    res.status(code).send({
        "code": code,
        "message": message
    })
}

module.exports = errorHandler;