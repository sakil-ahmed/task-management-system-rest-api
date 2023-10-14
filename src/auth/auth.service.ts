import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { SignUpDto } from "./dto/signUp.dto";
import { SignInDto } from "./dto/signIn.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {
  }

  async signUp(signUpDto: SignUpDto): Promise<unknown> {
    const { email, password } = signUpDto;
    const findUser = await this.userModel.findOne({ email });
    if (findUser) {
      throw new BadRequestException("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      ...signUpDto,
      password: hashedPassword
    });
    return this.getToken(user);
  }

  async signIn(signInDto: SignInDto): Promise<unknown> {
    const { password, email } = signInDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return this.getToken(user);
  }

  // Generate Tokens
  async getToken(user: any) {
    const { _id } = user;
    const accessToken = this.jwtService.sign({
      id: _id
    });
    const refreshToken = this.jwtService.sign({
      id: _id
    });
    return {
      accessToken,
      refreshToken,
      user
    };
  }

}
