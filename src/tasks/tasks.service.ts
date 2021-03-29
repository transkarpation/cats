import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(getTaskFilterDto: GetTaskFilterDto, user: User) {
        return this.taskRepository.getTasks(getTaskFilterDto, user)
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found =  await this.taskRepository.findOne({where: { id: id, userId: user.id }})

        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }

        return found;
    }

    async deleteTask(id: number): Promise<void> {
        const found = await this.getTaskById(id)
        await this.taskRepository.remove(found)
        return;
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status;
        await task.save();
        return task;
    }
}
