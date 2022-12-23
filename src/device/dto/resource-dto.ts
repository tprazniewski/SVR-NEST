import { IsNumberString } from 'class-validator';
export class ResourceId {
  @IsNumberString()
  id: number;
}
