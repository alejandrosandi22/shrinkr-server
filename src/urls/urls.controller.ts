import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateURLDto } from './dto/create-url.dto';
import { UpdateURLDto } from './dto/update-url.dto';
import { URLsService } from './urls.service';

@Controller('urls')
export class URLsController {
  constructor(private readonly urlsService: URLsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() createURLDto: CreateURLDto) {
    return this.urlsService.create(createURLDto);
  }

  @Post('shorten')
  shorten(@Body() createURLDto: CreateURLDto) {
    return this.urlsService.shorten(createURLDto);
  }

  @Get(':url')
  @UseGuards(AuthGuard)
  getURLByShortURL(@Param('url') url: string) {
    return this.urlsService.getURLByShortURL(url, [
      'original_url',
      'short_url',
      'expiration_date',
      'request_count',
      'active',
      'created_at',
    ]);
  }

  @Get('get-url/:url')
  getOriginalURL(@Param('url') url: string) {
    return this.urlsService.getURLByShortURL(url, [
      'original_url',
      'short_url',
    ]);
  }

  @Get('get-all/:id')
  @UseGuards(AuthGuard)
  getAllById(@Param('id') id: string) {
    return this.urlsService.getAllById(+id);
  }

  @Post('short-url/:url')
  setVisitByShortURL(@Body() body: any, @Param('url') shortURL: string) {
    return this.urlsService.setVisitByShortURL({ ...body, shortURL });
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateURLDto: UpdateURLDto) {
    return this.urlsService.update(+id, updateURLDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.urlsService.delete(+id);
  }
}
