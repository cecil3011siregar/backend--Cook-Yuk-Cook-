import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateTraining_themeDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  chef_name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

}
