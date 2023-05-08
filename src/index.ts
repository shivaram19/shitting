import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { startStandaloneServer } from '@apollo/server/standalone';
import {resolvers} from './TaskResolver'
import { GraphQLSchema } from "graphql";
import { ApolloServer } from "@apollo/server";


async function shit(){

const schema: GraphQLSchema = await buildSchema({
  resolvers:[resolvers],
  validate: {forbidUnknownValues: false}
})


const server = new ApolloServer({
  schema,
});
const { url } = await startStandaloneServer( server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
}
const connection = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "$pook567gh#",
  database: "nerves",
  entities: [ 
    // Add your entity classes here

  ],
  synchronize: true,
});

connection.initialize().then(async()=>{
  console.log("initialuzed");
  shit();
})





