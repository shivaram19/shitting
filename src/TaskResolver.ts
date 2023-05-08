import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Task } from './Task';

@Resolver()
export class resolvers {
  @Query(() => [Task])
  async getTasks() {
    return await Task.find();
  }

  @Query(() => Task)
  async getTask(@Arg('id') id: number)
   {
    return await Task.findOne({where:{id:id}});
  }

  @Mutation(() => Task)
  async createTask(@Arg('title') title: string, @Arg('description', { nullable: true }) description?: string, @Arg('completed', { defaultValue: false }) completed?: boolean) {
    const task = Task.create({ title, description, completed });
    await task.save();
    return task;
  }

  @Mutation(() => Task)
  async updateTask(@Arg('id') id: number, @Arg('title', { nullable: true }) title?: string, @Arg('description', { nullable: true }) description?: string, @Arg('completed', { nullable: true }) completed?: boolean) {
    const task = await Task.findOne({where:{id:id}});
    if (!task) {
      throw new Error('Task not found');
    }
    if (title !== undefined) {
      task.title = title;
    }
    if (description !== undefined) {
      task.description = description;
    }
    if (completed !== undefined) {
      task.completed = completed;
    }
    await task.save();
    return task;
  }

  @Mutation(() => Boolean)
  async deleteTask(@Arg('id') id: number) {
    const task = await Task.findOne({where:{id:id}});
    if (!task) {
      throw new Error('Task not found');
    }
    await task.remove();
    return true;
  }
}
