import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

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
        const idea = await this.ideaRepository.findOne({where: {id: id}});
        if(!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }

    async update(id: string, data: Partial<IdeaDTO>) {
        let idea = await this.ideaRepository.findOne({where: {id: id}});
        if(!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.update({id}, data);
        idea = await this.ideaRepository.findOne({where: {id: id}});
        return idea;
    }

    async delete(id: string) {
        const idea = await this.ideaRepository.findOne({where: {id: id}});
        if(!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.delete({id});

        return idea;
    }
}
