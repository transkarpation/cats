import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersController } from './folders.controller';
import { FolderRepository } from './folders.repository';
import { FoldersService } from './folders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FolderRepository
    ])
  ],
  controllers: [FoldersController],
  providers: [FoldersService]
})
export class FoldersModule {}
