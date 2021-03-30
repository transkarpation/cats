import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { Folder } from './folders.entity';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
    constructor(private folderService: FoldersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createFolder(
        @Body() createFolder: CreateFolderDto,
        @GetUser() user: User
    ): Promise<Folder> {
        return await this.folderService.createFolder(createFolder, user)
    }
}
