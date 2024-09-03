import prisma from "../database/client.js";

const controller =  {}  // Objeto vazio

controller.create = async function(req, res){
    try{
        /*
         Conecta-se ao Bd e envia uma instrução de criação de um novo documento, com os dados que estão dentro de req.body
        */
       await prisma.categoria.create({ data: req.body })

       // Envia uma resposta de sucesso ao front_end
       // HTTP 201: Created
       res.status(201).end()
    }
    catch(error){
        // Deu errado: exibe o erro no console do back-end
        console.error(error)

        // Envia o erro ao front-end, com o status 500
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

export default controller