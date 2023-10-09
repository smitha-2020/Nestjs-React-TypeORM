import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePhotoDto,
  Params,
  Photo,
  SortOrder,
} from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import axios from 'axios';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async createPhoto(newPhoto: CreatePhotoDto): Promise<Photo> {
    if (!newPhoto) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Fields missing' },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      //console.log(newPhoto);
      return await this.photosRepository.save(newPhoto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error Creating Record to DB',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchDataFromApiAndInsertIntoDB(): Promise<Photo[]> {
    try {
      const { data } = await axios(process.env.PICSUM_URL);
      for (const val of data) {
        const newPhoto: Photo = this.photosRepository.create({
          author: val['author'],
          width: val['width'],
          height: val['height'],
          url: val['url'],
          downloadUrl: val['download_url'],
          copiesDownloaded: Math.floor(Math.random() * 1000),
        });
        await this.photosRepository.save(newPhoto);
      }
      return this.photosRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error Loading data to DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPhotos(queryParams: Params): Promise<Photo[]> {
    if (!Object.keys(queryParams).length) {
      return this.photosRepository.find();
    }
    const orderDirection =
      SortOrder[queryParams.sortOrder] === 'ASC' ? 'ASC' : 'DESC';

    const sortField = queryParams.sortField;

    try {
      const page = queryParams.page;
      const pageSize = queryParams.pageSize;
      const qb = this.photosRepository
        .createQueryBuilder('product')
        .select('*')
        .orderBy(sortField, orderDirection);
      return await qb
        .offset((page - 1) * pageSize)
        .limit(pageSize)
        .getRawMany();
    } catch (error) {
      throw new HttpException(
        'Error Reading Records from DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAggregatedDownloadsForAuthor(): Promise<Photo[]> {
    try {
      const qb = this.photosRepository
        .createQueryBuilder('photo')
        .select([
          'photo.author As author',
          'SUM(photo.copiesDownloaded) as copiesDownloaded',
        ])
        .groupBy('photo.author')
        .orderBy('copiesDownloaded', 'DESC');

      return await qb.getRawMany();
    } catch (error) {
      throw new HttpException(
        'Error Reading Records from DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCount() {
    return await this.photosRepository.count();
  }

  async getOnePhotoById(id: number) {
    const recordFound = await this.photosRepository.findOneBy({ id });
    if (!recordFound) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    try {
      return recordFound;
    } catch (error) {
      throw new HttpException(
        'Error Reading Record from DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePhotoById(id: number, updatePhoto: UpdatePhotoDto) {
    if (!updatePhoto) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Fields missing' },
        HttpStatus.NOT_FOUND,
      );
    }

    const recordFound = await this.photosRepository.findOne({
      where: { id },
    });

    if (!recordFound) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    try {
      const photoToBeUpdated = Object.assign(recordFound, updatePhoto);

      return await this.photosRepository.save(photoToBeUpdated);
    } catch (error) {
      throw new HttpException(
        'Error Updating Record to DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePhotoById(id: number) {
    const recordFound = await this.photosRepository.findOneBy({ id });
    if (!recordFound) {
      throw new HttpException('Record does not exist', HttpStatus.NOT_FOUND);
    }
    try {
      const deletedData: { raw: any[]; affected?: number } =
        await this.photosRepository.delete(id);
      if ('affected' in deletedData && deletedData.affected > 0) {
        return `Record with ID ${id} deleted successfully`;
      }
    } catch (error) {
      throw new HttpException(
        'Error Removing Record from DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
