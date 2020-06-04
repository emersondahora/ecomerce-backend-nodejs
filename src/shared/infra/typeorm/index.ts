import { createConnections } from 'typeorm';

createConnections().then(conn =>
  console.log(conn.map(con => con.entityMetadatas.map(ett => ett.name))),
);
