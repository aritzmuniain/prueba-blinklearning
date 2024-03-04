import { createServer } from 'miragejs'
import { questionnaireSample } from './fixtures'

const createMockServer = function () {
 let server = createServer({
    routes() {
      this.get('/api/fetchQuestionnaire', () => questionnaireSample)
    },
  })
 return server;
};

export default createMockServer;