// src/controllers/demoController.ts
import { Request, Response } from 'express';
import { clientUserStory } from '../userStories/clientUSerStory';
import { success, created, badRequest } from '../infra/helper/responseHelper';


export class DemoController {
  getItems(req: Request, res: Response) {
    const items = clientUserStory.getAll();
    success(res, items); 
  }

  createItem(req: Request, res: Response) {
    try {
      const newItem = clientUserStory.create(req.body);
      created(res, newItem); 
    } catch (err: any) {
     badRequest(res, err.message); 
    }
  }
}

export const demoController = new DemoController();
