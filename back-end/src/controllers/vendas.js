import prisma from "../database/client.js";
import { includeRelatiosn } from "../lib/utils.js";

const controller =  {}  // Objeto vazio

controller.create = async function(req, res){
    try{
        /*
         Conecta-se ao Bd e envia uma instrução de criação de um novo documento, com os dados que estão dentro de req.body
        */
       await prisma.venda.create({ data: req.body })

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

controller.retrieveAll = async function(req, res){
    try {
        const include = includeRelatiosn(req.query)

        // Manda buscar os dados no servidor
        const result = await prisma.venda.findMany({
            orderBy: [ { data_hora: 'asc' } ],
            include
        })
        // Retorna os dados obtidos ao cliente com o status HTTP 200: OK (Implícito)
        res.send(result)
    }
    catch(error){
        // Deu errado: exibe o erro no console do back-end
        console.log(error)
        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Sever Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async function (req, res) {
    try{
        const include = includeRelatiosn(req.query)

        // Manda buscar o documento no servidor usando como critério de busca um id informado no parâmetro da requisição.
        const result = await prisma.venda.findUnique({
            where: { id: req.params.id },
            include
        })

        // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
        if(result) res.send(result)
            // Não encontrou o documento ~> retorna HTTP 404: Not found
        else res.status(404).end()
    }
    catch(error){
        // Deu errado: exibe o erro no console do back-end
        console.log(error)
        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Sever Error
        res.status(500).send(error)
    }
}

controller.update = async function (req, res) {
    try{
        // Busca  o documento pelo id passado como parâmetro e, caso o documento seja encontrado, 
        //atualiza-o com as informações passadas em req.body
        const result = await prisma.venda.update({
            where: { id: req.params.id },
            data: req.body
        })
        // Encontrou e atualizou ~> retorna HTTP 204: No Content
        if(result) res.status(204).end()
        // Não encontrou (e não atualizou) ~> retorna HTTP 404: Not Found
        else res.status(404).end()
    }
    catch(error){
        // Deu errado: exibe o erro no console do back-end
        console.log(error)
        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Sever Error
        res.status(500).send(error)
    }
}

controller.delete = async function (req, res) {
    try{
        // Busca o documento a ser excluído pelo id passado como parâmetro e efetua a exclusão caso encontrado
        await prisma.venda.delete({
            where: { id: req.params.id }
        })
        // Encontrou e excluiu ~> HTTP 204: No Content
        res.status(204).end()

    }
    catch(error){
        if(error?.code === 'P2025'){
            // Não encontrou e não excluiu ~> HTTP 404: Not Found
        }
        else{
            // Outros tipos de erro
            console.log(error)
            // Envia oerro ao front-end, com status 500
            // HTTP 500: Internal Server Error
            res.status(500).end()
        }
    }
}

//*********************************************************************************************************************************//

controller.createItem = async function (req, res) {
    try{
        // Adiciona no corpo da requisição o id da venda, passado como parâmetro na rota
        req.body.venda_id = req.params.id
        await prisma.itemVenda.create({ data: req.body })
        // Envia uma resposta de sucesso ao front_end
        // HTTP 201: Created
        res.status(201).end()
    }catch(error){
        // Deu errado: exibe o erro no console do back-end
        console.log(error)
        // Envia o erro ao front-end, com status 500
        // HTTP 500: Internal Sever Error
        res.status(500).send(error)
    }
}

controller.retrieveAllItems = async function(req, res) {
    try {
      const include = includeRelations(req.query)
  
      // Manda buscar os dados no servidor
      const result = await prisma.itemVenda.findMany({
        where: { venda_id: req.params.id },
        orderBy: [ { num_item: 'asc' } ],
        include
      })
  
      // HTTP 200: OK
      res.send(result)
    }
    catch(error) {
      // Deu errado: exibe o erro no console do back-end
      console.error(error)
  
      // Envia o erro ao front-end, com status 500
      // HTTP 500: Internal Server Error
      res.status(500).send(error)
    }
}

controller.retrieveOneItem = async function (req, res) {
    try{
        const result = await prisma.itemVenda.findFirst({
            where:{ id: req.params.ItemId, 
            venda_id: req.params.id}
        })
        // Encontrou o documento ~> retorna HTTP 200: OK (implícito)
        if(result) res.send(result)
            // Não encontrou o documento ~> retorna HTTP 404: Not found
        else res.status(404).end()
    }catch(error) {
    // Deu errado: exibe o erro no console do back-end
    console.error(error)

    // Envia o erro ao front-end, com status 500
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
    }
}

export default controller