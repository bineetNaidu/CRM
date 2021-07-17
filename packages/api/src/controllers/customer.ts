import { Request, Response } from 'express';
import { escapeRegex } from '../utils/excapeRegex';
import { Customer } from '../models/Customer';

export const searchCustomer = async (req: Request, res: Response) => {
  const { name } = req.query;
  const regex = new RegExp(escapeRegex((name as string) ?? ''), 'gi');
  const customers = await Customer.find().where('firstName').regex(regex);

  res.json({
    data: customers,
    length: customers.length,
    success: true,
  });
};

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
    notes: [],
    deals: [],
  }).save();
  res.status(201).json({
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
    data: customer ?? null,
    success: !!customer,
  });
};

export const updateCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) throw new Error('Customer Was Not Found!');

  await customer.set(req.body);
  const updatedCustomer = await customer.save();

  res.json({
    data: updatedCustomer,
    updated: !!customer,
  });
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) throw new Error('Customer Was Not Found!');

  await customer.remove();

  res.json({
    deletedCustomerId: customer.id,
    deleted: !!customer,
  });
};
