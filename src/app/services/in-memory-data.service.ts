import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const rsvps = [
      {id: 0, position: 0, name: "Jane Doe", timestamp: new Date().toLocaleString()}
    ];
    return {rsvps};
  }
}