import { Status } from '@prisma/client';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends CreateTaskDto {
  @IsEnum(Status)
  status: Status;
}
