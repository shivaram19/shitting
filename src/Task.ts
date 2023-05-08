import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";
// import {gql} from ''


@ObjectType()
@Entity()
export class Task extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ default: false })
  completed!: boolean;
}

export const typeDefs = `
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    getTasks: [Task]!
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, completed: Boolean): Task!
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task!
    deleteTask(id: ID!): Boolean!
  }
`;







