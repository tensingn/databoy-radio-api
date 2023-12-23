export class GetProductSnipcartDto {
  id: string;
  price: number;
  customFields?: Array<SnipcartCustomFieldDto>;
  url: string;
}

export class SnipcartCustomFieldDto {
  name: string;
  options: string;
}
