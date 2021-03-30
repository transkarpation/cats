import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from './folders.entity';
import { FolderRepository } from './folders.repository';

@Injectable()
export class FoldersService {
    constructor(
        @InjectRepository(FolderRepository)
        private folderRepository: FolderRepository
    ) {}

    async createFolder(createFolderDto: CreateFolderDto, user: User): Promise<Folder> {
        return await this.folderRepository.createFolder(createFolderDto, user)
    }
}
