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
    // Divide o conteúdo em linhas (suporta quebra de linha Unix e Windows)
    const lines = csvContent.split(/\r?\n/);

    // Remove a última linha, se houver
    if (lines.length > 0) {
      lines.pop();
    }

    // Junta as linhas novamente para formar o novo conteúdo CSV
    const newCsvContent = lines.join('\n');
    return {
      statusCode: 200,
          headers: {
      "Content-Type": "text/csv",
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "*", 
    },
      body: newCsvContent,
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
