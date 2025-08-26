// src/userStories/createItemUserStory.ts
import { getAll, addItem } from '../infra/data/demoData';
import { Item } from '../models/domain/iItem';
import emailService, { EmailPayload } from '../services/notificationService';

export class ClientUserStory {
  create(itemData: Omit<Item, 'id'>): Item {
    const exists = getAll().find(i => i.name === itemData.name);
    if (exists) throw new Error('Item already exists');

    const newItem = addItem(itemData);

    const email_info: EmailPayload = {
        to: "demo@correo.com",
        subject: "Nuevo item creado",
        body: `Se ha creado el item: ${newItem.name}`
    };

    // Llamada opcional a servicios externos
    emailService.sendEmail(email_info);

    return newItem;
  }

  getAll(): Item[] {
    const data = getAll();
    // Aquí podrías aplicar reglas de negocio adicionales
    return data;

  }

}

export const clientUserStory = new ClientUserStory();
