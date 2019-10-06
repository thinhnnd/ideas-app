import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import {IdeaDTO} from './idea.dto';

@Injectable()
export class IdeaService {
    constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    ) {}

    async showAllIdeas() {
        return await this.ideaRepository.find(); 
    }

    async create(data: IdeaDTO) {
        this.ideaRepository.create(data);
        const idea = await this.ideaRepository.save(data);
        return idea;
    }

    async read(id: string) {
        return this.ideaRepository.findOne({where: {id: id}});
    }

    async update(id: string, data: Partial<IdeaDTO>) {
        await this.ideaRepository.update({id}, data);
        return await this.ideaRepository.findOne({id});
    }

    async delete(id: string) {
        await this.ideaRepository.delete({id});
        return {deleted: true};
    }
}
