import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import {CreateUserDto} from "../shared/dto/CreateUser.dto";
import {AuthUserDto} from "../shared/dto/AuthUser.dto";
import {UserService} from "../service/user.service";

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDto) {
        return this.usersService.create(data);
    }

    @Post("/auth")
    login(@Body() data: AuthUserDto) {
        return this.usersService.login(data);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }
}
