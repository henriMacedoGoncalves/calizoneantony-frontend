export class Ebook {
  id!: number;
  title!: string;
  createDate!: Date;
  updateDate!: Date;
  price!: number;
  description!: string;

  // TODO insert folderPath to db and set img examples
  folderPath!: string;
}
