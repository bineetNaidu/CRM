import { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { Deal } from '../models/Deal';

export const createDeal = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    throw new Error('Customer not found');
  }
  const { name, description, startDate, endDate, estimatedTime, status } =
    req.body;

  const deal = await Deal.build({
    name,
    description,
    startDate,
    endDate,
    estimatedTime,
    status,
  }).save();

  customer.deals.push(deal._id);
  await customer.save();

  res.json({
    data: deal,
    created: !!deal,
    success: true,
  });
};

export const getAllDealsByCustomer = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new Error('Customer Was Not Found!');
  const deals = await Deal.find({
    _id: {
      $in: customer.deals,
    },
  });

  res.json({
    data: deals,
    length: deals.length,
    success: true,
  });
};

export const updateDeal = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new Error('Customer Was Not Found!');
  const deal = await Deal.findById(req.params.dealId);
  if (!deal) throw new Error('Deal Was Not Found!');
  deal.set(req.body);
  const updatedDeal = await deal.save();

  res.json({
    data: updatedDeal,
    updated: !!deal,
  });
};

export const deleteDeal = async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw new Error('Customer Was Not Found!');
  const deal = await Deal.findById(req.params.dealId);
  if (!deal) throw new Error('Deal Was Not Found!');

  await customer.update({
    $pull: {
      deals: deal._id,
    },
  });

  await customer.save();

  await deal.remove();

  res.json({
    deletedDealId: deal.id,
    deleted: !!deal,
  });
};
