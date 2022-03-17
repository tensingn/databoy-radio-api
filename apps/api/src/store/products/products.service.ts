import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Size } from '../enums/sizes.enum';

@Injectable()
export class ProductsService {
  findAll(): ProductDto[] {
    return mockProducts;
  }

  findOne(id: number) {
    return mockProducts.find((p) => p.id === id);
  }
}

let mockProducts: ProductDto[] = [
  {
    id: 1,
    name: 'Shirt',
    pluralName: 'Shirts',
    type: 'Clothing',
    price: 19.99,
    img: 'https://cdni.llbean.net/is/image/wim/224547_1_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
    otherImages: [
      'https://cdni.llbean.net/is/image/wim/224547_1_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
      'https://cdni.llbean.net/is/image/wim/224547_1_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
      'https://cdni.llbean.net/is/image/wim/224547_1_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
    ],
    releaseDate: new Date('2022-02-26'),
    sizes: Object.keys(Size),
  },
  {
    id: 2,
    name: 'Hat',
    pluralName: 'Hats',
    type: 'Acccessories',
    price: 12.99,
    img: 'https://media.kohlsimg.com/is/image/kohls/3527811_Black?wid=1200&hei=1200&op_sharpen=1',
    otherImages: [
      'https://media.kohlsimg.com/is/image/kohls/3527811_Black?wid=1200&hei=1200&op_sharpen=1',
      'https://media.kohlsimg.com/is/image/kohls/3527811_Black?wid=1200&hei=1200&op_sharpen=1',
      'https://media.kohlsimg.com/is/image/kohls/3527811_Black?wid=1200&hei=1200&op_sharpen=1',
    ],
    releaseDate: new Date('2022-02-25'),
    sizes: [],
  },
  {
    id: 3,
    name: 'Mixtape',
    pluralName: 'Mixtapes',
    type: 'Music',
    price: 9.99,
    img: 'https://hub.yamaha.com/wp-content/uploads/2021/04/mixtape-cassette-image_1400-1024x544.jpg',
    otherImages: [
      'https://hub.yamaha.com/wp-content/uploads/2021/04/mixtape-cassette-image_1400-1024x544.jpg',
      'https://hub.yamaha.com/wp-content/uploads/2021/04/mixtape-cassette-image_1400-1024x544.jpg',
      'https://hub.yamaha.com/wp-content/uploads/2021/04/mixtape-cassette-image_1400-1024x544.jpg',
    ],
    releaseDate: new Date('2022-02-24'),
    sizes: [],
  },
  {
    id: 4,
    name: 'Sweatpants',
    pluralName: 'Pairs of Sweatpants',
    type: 'Clothing',
    price: 29.99,
    img: 'https://cdni.llbean.net/is/image/wim/512293_50118_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
    otherImages: [
      'https://cdni.llbean.net/is/image/wim/512293_50118_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
      'https://cdni.llbean.net/is/image/wim/512293_50118_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
      'https://cdni.llbean.net/is/image/wim/512293_50118_41?hei=1092&wid=950&resMode=sharp2&defaultImage=llbprod/A0211793_2',
    ],
    releaseDate: new Date('2022-02-23'),
    sizes: Object.keys(Size),
  },
  {
    id: 5,
    name: 'Hoodie',
    pluralName: 'Hoodies',
    type: 'Clothing',
    price: 39.99,
    img: 'https://imgprd19.hobbylobby.com/3/41/22/34122aa4291387b735fc61c2e614d6a038fd0102/350Wx350H-1385194-0320.jpg',
    otherImages: [
      'https://imgprd19.hobbylobby.com/3/41/22/34122aa4291387b735fc61c2e614d6a038fd0102/350Wx350H-1385194-0320.jpg',
      'https://imgprd19.hobbylobby.com/3/41/22/34122aa4291387b735fc61c2e614d6a038fd0102/350Wx350H-1385194-0320.jpg',
      'https://imgprd19.hobbylobby.com/3/41/22/34122aa4291387b735fc61c2e614d6a038fd0102/350Wx350H-1385194-0320.jpg',
    ],
    releaseDate: new Date('2022-02-22'),
    sizes: Object.keys(Size),
  },
];
