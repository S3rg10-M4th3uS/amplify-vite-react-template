import { useAuthenticator } from '@aws-amplify/ui-react';
import { DefaultFileUploaderExample } from './fileUploader';

function App() {

  const { user, signOut } = useAuthenticator();
  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <DefaultFileUploaderExample />
      <button onClick={signOut}>Deslogar</button>
    </main>
  );
}

export default App;