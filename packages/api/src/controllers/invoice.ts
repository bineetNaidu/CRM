import { Invoice } from '../models/Invoice';
import { Request, Response } from 'express';

export const createInvoice = async (req: Request, res: Response) => {
  const invoice = await Invoice.build(req.body).save();
  res.status(201).json({
    data: invoice,
    created: !!invoice.id,
  });
};

export const getInvoices = async (_req: Request, res: Response) => {
  const invoices = await Invoice.find({}).populate('customer').exec();
  res.status(200).json({
    data: invoices,
    length: invoices.length,
    success: true,
  });
};

export const getInvoice = async (req: Request, res: Response) => {
  const invoice = await Invoice.findById(req.params.invoiceId)
    .populate('customer')
    .exec();
  res.status(200).json({
    data: invoice,
    success: !!invoice,
  });
};

export const deleteInvoice = async (req: Request, res: Response) => {
  const invoice = await Invoice.findById(req.params.invoiceId)
    .populate('customer')
    .exec();
  if (!invoice) throw new Error('Invoice not found');
  await invoice.remove();

  res.status(200).json({
    deletedInvoiceId: invoice.id,
    deleted: !!invoice,
  });
};
