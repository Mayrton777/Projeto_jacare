const conn = require("./connection");

const insert = async (user) => {
    Number(user.qtd_pessoas)
    try {
        const result = await conn.execute(
            `INSERT INTO reserva
            (nome, email, dt_reserva, qtd_pessoas, Obs) VALUES (?, ?, ?, ?, ?)`,
            [user.nome, user.email, user.dt_reserva, user.qtd_pessoas, user.Obs]
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
            "SELECT * FROM reserva",
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