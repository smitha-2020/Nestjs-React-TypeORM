import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto, Params, PhotoIdDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() newPhoto: CreatePhotoDto) {
    return this.photosService.createPhoto(newPhoto);
  }
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/Images',
        filename: (req, file, cb) => {
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

          const fileExtension = path.parse(file.originalname).ext;

          cb(null, `${fileName}${fileExtension}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    //console.log(file.filename);
    return file.filename;
  }

  @Post('/fetchAndInsert')
  fetchDataFromApiAndInsert() {
    return this.photosService.fetchDataAndInsertIntoDB();
  }

  @Get()
  findAllPhotos(@Query() queryParams?: Params) {
    return this.photosService.findAllPhotos(queryParams);
  }

  @Get('author-photosDownloaded')
  getAggregatedAuthorDownloads() {
    return this.photosService.getAggregatedAuthorDownloads();
  }

  @Get('count')
  getCount(): Promise<number> {
    return this.photosService.getCount();
  }

  @Get(':id')
  findOne(@Param() reqParams: PhotoIdDto) {
    return this.photosService.findOne(reqParams.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePhoto: UpdatePhotoDto) {
    return this.photosService.update(+id, updatePhoto);
  }

  @Delete(':id')
  remove(@Param() reqParams: PhotoIdDto) {
    return this.photosService.remove(reqParams.id);
  }
}
