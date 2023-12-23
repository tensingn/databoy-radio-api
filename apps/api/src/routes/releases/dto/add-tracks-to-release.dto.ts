import { ArrayMaxSize, ArrayMinSize, IsArray } from 'class-validator';

export class AddTracksToReleaseDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  tracks: Array<string>;
}
