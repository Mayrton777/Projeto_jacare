const conn = require("./connection");

const insert = async (user) => {
    try {
        const result = await conn.execute(
            `INSERT INTO reserva
            (nome, email, data_hora_reserva, num_pessoa) VALUES (?, ?, ?, ?)`,
            [user.nome, user.email, user.data_hora_reserva, user.num_pessoa]
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const select = async () => {
    try {
        const result = await conn.execute(
            "SELECT * FROM usuario",
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const result = await conn.execute(
            `DELETE FROM usuario WHERE id_user = ?`,
            [id]
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUser = async (user) => {
    try {
        const result = await conn.execute(
            `UPDATE usuario SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id_user = ?`,
            [user.first_name, user.last_name, user.email, user.phone, user.id_user]
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateUserPhone = async (user) => {
    try {
        const result = await conn.execute(
            `UPDATE usuario SET phone = ? WHERE id_user = ?`,
            [user.phone, user.id_user]
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    insert, select, deleteUser, updateUser, updateUserPhone
};