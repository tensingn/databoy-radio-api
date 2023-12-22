import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryOptions } from '../../services/database/firestore/firestore.service';
import { AuthorizationGuard } from '../../authorization/authorization.guard';
import {
  USER_PERMISSIONS,
  Permissions,
} from '../../authorization/permissions.decorator';
import { PermissionsGuard } from '../../authorization/permissions.guard';
import { RolesGuard } from '../../authorization/roles.guard';
import { ROLES, Roles } from '../../authorization/roles.decorator';
import { UserSelfActionGuard } from '../../authorization/user-self-action.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Permissions(USER_PERMISSIONS.CREATE_USER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Permissions(USER_PERMISSIONS.READ_USER)
  getCollection(@Body() query: QueryOptions) {
    return this.usersService.getCollection(query);
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Permissions(USER_PERMISSIONS.READ_USER)
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Permissions(USER_PERMISSIONS.UPDATE_USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Permissions(USER_PERMISSIONS.DELETE_USER)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':id/likes')
  @UseGuards(AuthorizationGuard, RolesGuard, new UserSelfActionGuard('id'))
  @Roles(ROLES.ADMIN, ROLES.USER)
  getLikes(@Param('id') id: string) {
    return this.usersService.getLikes(id);
  }
}
