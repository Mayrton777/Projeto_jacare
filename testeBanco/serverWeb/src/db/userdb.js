const conn = require("./connection");

const select = async () => {
    try {
        const result = await conn.execute(
            `SELECT * FROM usuario`,
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    select
};
