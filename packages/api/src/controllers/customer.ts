import { Request, Response } from 'express';
import { Customer } from '../models/Customer';

export const createCustomer = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, timezone, avatar } =
    req.body;
  const customer = await Customer.build({
    firstName,
    lastName,
    email,
    phoneNumber,
    timezone,
    avatar,
  }).save();
  res.json({
    data: customer,
    created: !!customer,
    success: true,
  });
};

export const getAllCustomers = async (_req: Request, res: Response) => {
  const customers = await Customer.find({});
  res.json({
    data: customers,
    length: customers.length,
    success: true,
  });
};

export const getCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  res.json({
    data: customer,
    success: !!customer,
  });
};
