import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log("event", JSON.stringify(event, null, 2));
    
    if (!event.body) {
      console.log("No body provided");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Nenhum conteúdo fornecido." }),
      };
    }
    
    let csvContent = event.body;
    console.log("CSV content received (length):", csvContent.length);
    console.log("CSV content first 100 chars:", csvContent.substring(0, 100));
    
    // Divide o conteúdo em linhas (suporta quebra de linha Unix e Windows)
    const lines = csvContent.split(/\r?\n/);
    console.log("Total lines before processing:", lines.length);
    console.log("Lines content:", JSON.stringify(lines));
    
    // Check if the last line is just a period
    if (lines.length > 0 && lines[lines.length - 1] === '.') {
      console.log("Last line is a period, removing it");
      lines.pop();
    } 
    // Or check if the last line is empty
    else if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      console.log("Last line is empty, removing it");
      lines.pop();
    }
    
    console.log("Total lines after processing:", lines.length);
    
    // If we ended up with zero lines, this is a problem
    if (lines.length === 0) {
      console.log("WARNING: No lines remaining after processing");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Processamento resultou em conteúdo vazio." }),
      };
    }
    
    // Junta as linhas novamente para formar o novo conteúdo CSV
    const newCsvContent = lines.join('\n');
    console.log("New CSV content length:", newCsvContent.length);
    console.log("New CSV content first 100 chars:", newCsvContent.substring(0, 100));
    
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
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }),
    };
  }
};