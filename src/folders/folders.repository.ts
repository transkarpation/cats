import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { Folder } from "./folders.entity";

@EntityRepository(Folder)
export class FolderRepository extends Repository<Folder> {
    async createFolder(createFolderDto: CreateFolderDto, user: User): Promise<Folder> {
        const {name} = createFolderDto;
        const folder = new Folder();

        folder.name = name;
        folder.userId = user.id;
        await folder.save();
        return folder;
    }
}