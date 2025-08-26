// src/utils/responseHelper.ts
import { Response } from 'express';

export const success = (res: Response, data: any) => res.status(200).json(data);
export const created = (res: Response, data: any) => res.status(201).json(data);
export const badRequest = (res: Response, error: any) => res.status(400).json({ error });
