import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { InboxModule } from './inbox/inbox.module';
import { TransactionModule } from './transaction/transaction.module';
import { RewardModule } from './reward/reward.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    InboxModule,
    TransactionModule,
    RewardModule,
    PaymentMethodModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('DATABASE URL ENV', config.get<string>('DATABASE_URL'));
        return { uri: config.get<string>('DATABASE_URL') };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
