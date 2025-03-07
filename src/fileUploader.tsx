import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import { post } from 'aws-amplify/api';

const processFile = async ({ file }: { file: File }): Promise<{ file: File; key: string }> => {
        try {
        // Lê o conteúdo do arquivo CSV como texto
        const csvContent = await file.text();

        // Chama o endpoint da Lambda que remove a última linha do CSV
        const restOperation = post({
            apiName: 'myRestApi',
            path: 'items',
            options: {
                body: {
                    message: csvContent
                }
            }
        });

        const { body } = await restOperation.response;
        const response = await body.json();

        if (!response) {
            throw new Error('Erro ao processar o arquivo CSV na Lambda');
        }

        // Obtém o CSV modificado (como texto) da resposta
        const modifiedCsv = await body.text();

        // Gera uma nova key baseada no nome original, adicionando o sufixo '-modified'
        const fileNameParts = file.name.split('.');
        const extension = fileNameParts.pop();
        const baseName = fileNameParts.join('.');
        const newKey = `${baseName}-modified.${extension}`;

        // Cria um novo File com o conteúdo modificado, mantendo as propriedades necessárias
        const newFile = new File([modifiedCsv], newKey, {
            type: 'text/csv',
            lastModified: file.lastModified,
        });

        // Retorna o novo arquivo e a key conforme o tipo ProcessFileParams
        return { file: newFile, key: newKey };
    } catch (error) {
        console.error('Erro no processamento do arquivo:', error);
        throw error;
    }
};

export const DefaultFileUploaderExample = () => {
    return (
        <FileUploader
            acceptedFileTypes={['text/csv']}
            path="public/"
            maxFileCount={1}
            processFile={processFile}
        />
    );
};
