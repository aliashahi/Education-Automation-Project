import { FileDto } from 'src/app/shared/models/file.dto';

export interface Resource {
  id: number;
  title: string;
  description: string;
  file: string;
  created: string;
  updated: string;
  showPlaceholder?: boolean;
  filesToShow?: FileDto[];
}
