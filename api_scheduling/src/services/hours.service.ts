import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hour } from '../entities/hour.entity';
import { UpdateHourDto } from '../dtos/update-hour.dto';

@Injectable()
export class HoursService {
  constructor(
    @InjectRepository(Hour)
    private readonly repo: Repository<Hour>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async toggleAvailability(id: number, data: UpdateHourDto) {
    await this.repo.update(id, { available: data.available });
    return this.repo.findOneBy({ id });
  }
}
