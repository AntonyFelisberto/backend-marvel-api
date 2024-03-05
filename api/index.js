var md5 = require('md5');
var express = require("express");

const axios = require("axios");
const time = Number(new Date());

const apikey = process.env.API_KEY
const secretKey = process.env.SECRET_KEY
const hash = md5(time+secretKey+apikey);

var app = express()
app.listen(3800)

app.get("/marvel-api/:password",(req,res) => {
    var password = req.params.password

    if("123" == password){
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${time}&apikey=${apikey}&hash=${hash}`)
            .then(
                (response) => {
                    res.status(200).send({
                        result:response.data.data.results
                    })
                }
            )
            .catch(
                (error) => {
                    res.status(400).send({
                        message:"Erro ao consultar dados " + error.message
                    })
                }
            );
    }else{
        res.status(403).send({
            message:"Invalido entrada de acesso a API"
        })
    }

})

app.get("/marvel-api/:id/:password",(req,res) => {
    var password = req.params.password
    var id = req.params.id

    if(process.env.PASSWORD_CONNECTION == password){
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${time}&apikey=${apikey}&hash=${hash}`)
            .then(
                (response) => {
                    res.status(200).send({
                        result:response
                    })
                }
            )
            .catch(
                (error) => {
                    res.status(400).send({
                        message:"Erro ao consultar dados" + error.message
                    })
                }
            );
    }else{
        res.status(403).send({
            message:"Invalido entrada de acesso a API"
        })
    }

})