import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
    return this.productsClient.send({cmd: 'create_product'}, createProductDto)
  }

  @Get()
  findAllProducts(@Query() paginationDto:PaginationDto){
    return this.productsClient.send({cmd:'find_all_product'}, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd: 'find_one_product'}, {id})
      ); 
      return product;
    } catch (error) {
      throw new RpcException(error)
    }
    
  }

  @Patch(':id')
  async patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto:UpdateProductDto  
  ){
    try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd: 'update_product'}, {
          id,
          ...updateProductDto})
      ); 
      return product;
    } catch (error) {
      throw new RpcException(error)
    }
  }
  

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number){
    try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd: 'delete_product'}, {id})
      ); 
      return product;
    } catch (error) {
      throw new RpcException(error)
    }
  }
  

}
