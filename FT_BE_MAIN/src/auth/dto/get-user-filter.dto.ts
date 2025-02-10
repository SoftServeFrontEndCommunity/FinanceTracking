import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class GetUserFilteredDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  username?: string;
}
