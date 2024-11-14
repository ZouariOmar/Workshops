import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { OrderItemService } from 'src/order-item/order-item.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class StockGuard implements CanActivate {
  constructor(private readonly productService: ProductService) {} // Injectez le service d'OrderItem
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const orderItems = (request.body as CreateOrderDto).items;
    // Supposons que l'ID du produit soit envoyé dans le corps de la requête
    console.log(orderItems)
    for(let item of orderItems) {
      
      const product = await this.productService.findOne(item.productId); // Récupérer le produit par son ID
      if (!product) {
        throw new BadRequestException(
          `Product with Id ${item.productId} not found `,
        ); // Lance une exception si le produit n'est pas disponible
      }
      console.log(product)
      if (product.stock < item.quantity) {
        throw new BadRequestException('Hors stock'); // Lance une exception si le produit n'est pas disponible
      }
    };

    return true; // Si tout va bien, autorise la requête
  }
}
