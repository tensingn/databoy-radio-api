import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReleaseDto } from './dto/create-release.dto';
import { ReleasesService } from './services/releases.service';
import { QueryOptions } from '../../services/database/firestore/firestore.service';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { TransformBooleanPipe } from '../../pipes/transform-boolean.pipe';
import { AddTracksToReleaseDto } from './dto/add-tracks-to-release.dto';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import { RolesGuard } from '../../authorization/roles.guard';
import { UserSelfActionGuard } from '../../authorization/user-self-action.guard';
import { ROLES, Roles } from '../../authorization/roles.decorator';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import {
  Permissions,
  RELEASE_PERMISSIONS,
} from '../../authorization/permissions.decorator';

@Controller('api/releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Post()
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  create(@Body() createReleaseDto: CreateReleaseDto) {
    return this.releasesService.create(createReleaseDto);
  }

  @Get()
  getCollection(
    @Query('startAfter') startAfter: string = null,
    @Query('limit') limit: number = 10,
    @Query('includeTracks', new TransformBooleanPipe()) includeTracks: boolean,
  ) {
    let query: QueryOptions = ReleasesService.STANDARD_RELEASES;
    return this.releasesService.getCollection(query, includeTracks);
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
    @Query('includeTracks', new TransformBooleanPipe()) includeTracks: boolean,
  ) {
    return this.releasesService.getOne(id, includeTracks);
  }

  @Patch(':id')
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  update(@Param('id') id: string, @Body() updateReleaseDto: UpdateReleaseDto) {
    return this.releasesService.update(id, updateReleaseDto);
  }

  @Post(':id/likes/:userID')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('userID'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  like(@Param('id') id: string, @Param('userID') userID: string) {
    return this.releasesService.like(id, userID);
  }

  @Delete(':id/likes/:userID')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('userID'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  unlike(@Param('id') id: string, @Param('userID') userID: string) {
    return this.releasesService.like(id, userID, true);
  }

  @Get(':id/likes')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('userID'))
  @Roles(ROLES.USER, ROLES.ADMIN)
  getLikes(@Param('id') id: string) {
    return this.releasesService.getLikes(id);
  }

  @Post(':id/tracks')
  @UseGuards(AuthorizationGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  addTracksToRelease(
    @Param('id') id: string,
    @Body() addTracksToReleaseDto: AddTracksToReleaseDto,
  ) {
    return this.releasesService.addTracksToRelease(id, addTracksToReleaseDto);
  }
}
