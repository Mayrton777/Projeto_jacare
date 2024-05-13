const express = require('express');
const router = express.Router();
const userDB = require("../db/userdb");

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


module.exports = router;
