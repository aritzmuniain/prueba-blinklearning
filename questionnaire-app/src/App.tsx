import { Main } from './app/questionnaire';
import createMockServer from './mock-server/mock';

createMockServer();


function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
