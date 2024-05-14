const conn = require("./connection");

const insert = async (user) => {
    Number(user.qtd_pessoas)
    try {
        const result = await conn.execute(
            `INSERT INTO reserva
            (nome, telefone, dt_reserva, qtd_pessoas, obs) VALUES (?, ?, ?, ?, ?)`,
            [user.nome, user.telefone, user.dt_reserva, user.qtd_pessoas, user.obs]
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
            "SELECT * FROM reserva"
        );
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const selectTelefone = async (telefone, id) => {
    try {
        const result = await conn.execute(
            `SELECT * FROM reserva WHERE telefone = ? and id = ?`,[telefone, id]
        )
        return result;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}


const selectId = async (id) => {
    try {
        const result = await conn.execute(
            `SELECT * FROM reserva WHERE id = ?`,[id]
        )
        return result;
    } catch (error) {
        console.log(error);
        
        throw error;
    }
}


const deleteUser = async (id) => {
    try {
        const result = await conn.execute(
            `DELETE FROM reserva WHERE id = ?`,
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
            `UPDATE reserva SET nome = ?, telefone = ?, dt_reserva = ?, qtd_pessoas = ? obs = ? WHERE id_user = ?`,
            [user.nome, user.telefone, user.dt_reserva, user.qtd_pessoas, user.obs, user.id]
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
    selectId,insert, select, deleteUser, updateUser, updateUserPhone, selectTelefone
};