import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { Dropbox } from 'dropbox';

@Injectable()
export class DropboxService {
  private dropbox: Dropbox;

  constructor() {
    this.dropbox = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });
  }

  async list_folder() {
    return await this.dropbox.filesListFolder({ path: '/mixes' });
    //   .then((response: any) => {
    //     console.log(response);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
  }
}
