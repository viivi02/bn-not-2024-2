/*
    Função que processa a query string da requisição e verifica se o parâmetro include foi passado.
    Caso positivo, preenche um objeto com os relacionamentos que devem ser incluidos na consulta sendo executada.
*/
function includeRelatiosn(query){
    // Por padrão, não inclui nenhum relacionamento
    const include = []
    
    // Se o parâmetro include estiver na query string
    if(query.include){
        // Recorta o valor do parâmetro, separando os relacionamentos passados por vírgula
        const relations = query.include.split(',')

        // Preenche o includes com as relações informadas
        for(let rel of relations){
            include[rel] = true
        }
    }

    return include
}

export { includeRelatiosn }