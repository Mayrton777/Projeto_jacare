const express = require('express');
const router = express.Router();
const userDB = require("../db/userdb");



router.post("/", async (req, res) => {
    const user = req.body;
    console.log(user)
    try {
        const [result] = await userDB.insert(user);
        const insertedUserId = result.insertId;
        const insertedUser = await userDB.selectId(insertedUserId);
        res.status(201).json({
            message: insertedUser
        });
    } catch(err) {
        console.log(err);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao cadastrar uma pessoa"})
    }
});

router.get("/", async (req, res) => {
    try {
        const result = await userDB.select();
        res.status(200).json({
            result
        });
    } catch (erro) {
        console.log(erro);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao consultar"})
    }
})

router.get("/:telefone/:id", async (req, res) => {
    const telefone = req.params.telefone
    const id = req.params.id
    try {
        const result = await userDB.selectTelefone(telefone, id);
        res.status(200).json({
            result
        });
    } catch (erro) {
        console.log(erro);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao consultar"})
    }
})


router.delete("/", async (req, res) => {
    const user = req.query;
    try {
        const result = await userDB.deleteUser(user.id);
        res.status(200).json({
            message: "Usuário deletado com sucesso!"
        });
    } catch (erro) {
        console.log(erro);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao deletar"})
    }
})

router.put("/", async (req, res) => {
    const user = req.body;
    try {
        const result = await userDB.updateUser(user);
        res.status(200).json({
            message: `Usuário ${user.id_user} atualizado`
        });
    } catch (erro) {
        console.log(erro);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao atualizar o usuario"})
    }
})

router.patch("/", async (req, res) => {
    const user = req.body;
    console.log(user)
    try {
        const result = await userDB.updateUserPhone(user);
        res.status(200).json({
            message: `O campo ${user.phone} foi atualizado com sucesso!`
        });
    } catch (erro) {
        console.log(erro);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao atualizar o usuario"})
    }
})

router.post("/criar", async (req, res) => {
    try {
        const [result] = await userDB.creatTable();
        res.status(200).json({
            message: "Tabela criado com sucesso"
        });
    } catch(err) {
        console.log(err);
        res
            .status(500)
            .json({message : "Ocorreu um erro ao criar tabela"})
    }
});

module.exports = router;