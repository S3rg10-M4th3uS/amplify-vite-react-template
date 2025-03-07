import { FileUploader } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

export const DefaultFileUploaderExample = () => {
    return (
        <FileUploader
            acceptedFileTypes={['.csv']}
            path="csv/"
            maxFileCount={1}
            isResumable
        />
    );
};