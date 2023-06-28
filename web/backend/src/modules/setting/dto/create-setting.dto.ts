import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @IsBoolean()
  @IsOptional()
  shop: string;
  @IsBoolean()
  @IsOptional()
  hide_price: boolean;
  @IsBoolean()
  @IsOptional()
  hide_add_to_cart: boolean;
}
