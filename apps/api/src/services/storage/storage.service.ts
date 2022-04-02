import { Injectable } from '@nestjs/common';
import { storageClient } from './../../clients/storage.client';
@Injectable()
export class StorageService {
  bucket = storageClient.bucket('databoy-radio-api-stage');

  test() {}

  async getObject(fileName: string) {
    let file = await this.bucket.file(fileName).get();
    console.log(file[0]);
    return file;
  }
}
