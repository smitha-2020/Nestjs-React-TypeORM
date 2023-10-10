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
  createPhotoDetails(@Body() newDetails: CreatePhotoDto) {
    return this.photosService.createPhoto(newDetails);
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

  @Post('/fetch-insert')
  fetchDataFromApiAndInsertIntoDB() {
    return this.photosService.fetchDataFromApiAndInsertIntoDB();
  }

  @Get()
  getAllPhotos(@Query() queryParams?: Params) {
    return this.photosService.getAllPhotos(queryParams);
  }

  @Get('author-photos-downloaded')
  getAggregatedDownloadsForAuthor() {
    return this.photosService.getAggregatedDownloadsForAuthor();
  }

  @Get('count')
  getCount(): Promise<number> {
    return this.photosService.getCount();
  }

  @Get(':id')
  getOnePhotoById(@Param() reqParams: PhotoIdDto) {
    return this.photosService.getOnePhotoById(reqParams.id);
  }

  @Put(':id')
  updatePhotoById(
    @Param('id') id: string,
    @Body() updatePhoto: UpdatePhotoDto,
  ) {
    return this.photosService.updatePhotoById(+id, updatePhoto);
  }

  @Delete(':id')
  removePhotoById(@Param() reqParams: PhotoIdDto) {
    return this.photosService.removePhotoById(reqParams.id);
  }
}
