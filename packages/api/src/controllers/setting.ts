import { Request, Response } from 'express';
import { Setting } from '../models/Setting';

export const createSetting = async (req: Request, res: Response) => {
  const existingSetting = await Setting.find({});
  if (existingSetting.length > 0) {
    return res.status(409).json({
      message: 'Setting already exists',
    });
  }

  const { isDarkMode, timezone, crmName } = req.body;

  const setting = await Setting.build({
    isDarkMode,
    timezone,
    crmName,
  }).save();

  return res.status(201).json({
    data: setting,
    success: true,
    created: !!setting.id,
  });
};

export const getSetting = async (_req: Request, res: Response) => {
  const [setting] = await Setting.find({});

  res.json({
    data: setting,
    success: !!setting,
  });
};

export const updateSetting = async (req: Request, res: Response) => {
  const [setting] = await Setting.find({});

  if (!setting) throw new Error('Setting not found');

  setting.set(req.body);
  const updatedSetting = await setting.save();

  res.json({
    data: updatedSetting,
    success: true,
    update: true,
  });
};
