import { Injectable } from '@nestjs/common';
import { DropboxService } from '../../services/dropbox/dropbox.service';

@Injectable()
export class MixesService {
  constructor(private dropboxService: DropboxService) {}

  findAll() {
    return this.dropboxService.list_folder();
  }

  findOne(id: number) {
    return `This action returns a #${id} mix`;
  }
}
