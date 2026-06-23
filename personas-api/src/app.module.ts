import { Module } from '@nestjs/common';
import { PersonasModule } from './personas/personas.module';

@Module({
  imports: [PersonasModule],
})
export class AppModule {}
