export interface FileDto {
  id: number;
  name: string;
  file: File | string;
  yet_to_upload: boolean;
}
