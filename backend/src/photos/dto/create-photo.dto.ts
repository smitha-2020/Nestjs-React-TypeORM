import {
  IsString,
  IsInt,
  IsUrl,
  IsAlpha,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @Matches(/^[a-z0-9 ]+$/i)
  public author: string;
  @IsInt()
  public width: number;
  @IsInt()
  public height: number;
  @IsUrl()
  @IsOptional()
  public url: string;
  public downloadUrl: string;
  @IsInt()
  public copiesDownloaded: number;
}
export class Photo {
  public id: number;
  @IsString()
  @IsAlpha()
  public author: string;
  @IsInt()
  public width: number;
  @IsInt()
  public height: number;
  @IsUrl()
  public url: string;
  @IsUrl()
  public downloadUrl: string;
  @IsInt()
  public copiesDownloaded: number;
}

export class PhotoIdDto {
  readonly id: number;
}

export enum SortOrder {
  ASC,
  DESC,
}

export interface Params {
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'desc' | 'asc';
}
