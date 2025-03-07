import { useAuthenticator } from '@aws-amplify/ui-react';
import { DefaultFileUploaderExample } from './fileUploader';

function App() {

  const { user, signOut } = useAuthenticator();
  return (
    <main>
      <h1>Usuário: {user?.signInDetails?.loginId}</h1>
      <DefaultFileUploaderExample />
      <button onClick={signOut}>Deslogar</button>
    </main>
  );
}

export default App;