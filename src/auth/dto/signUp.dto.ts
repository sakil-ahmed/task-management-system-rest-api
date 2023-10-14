import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly shortBio: string;
}