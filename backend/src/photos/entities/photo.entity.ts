import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  author: string;

  @Column('int')
  width: number;

  @Column('int')
  height: number;

  @Column({ nullable: true })
  url: string | null;

  @Column('text')
  downloadUrl: string;

  @Column()
  copiesDownloaded: number;
}
