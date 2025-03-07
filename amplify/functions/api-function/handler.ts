import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log("event", event);
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Nenhum conteúdo fornecido." }),
      };
    }
    
    
    let csvContent = event.body;
    
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: csvContent.toUpperCase(),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }),
    };
  }
};