import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Select,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { axios } from '../lib/axios';
import type { IInvoice } from '@crm/common';
import { useCustomerStore } from '../lib/customer.store';
import { useInvoiceStore } from '../lib/invoice.store';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const CreateInvoiceModal: FC<Props> = ({ isOpen, onClose }) => {
  const customers = useCustomerStore((s) => s.customers);
  const addInvoice = useInvoiceStore((s) => s.addInvoice);
  const toast = useToast();

  return (
    <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{
          customer: '',
          invoiceDate: '',
          method: '',
          transactionId: '',
          cardNumber: '',
          subject: '',
          summary: '',
          totalAmount: 0,
          tax: 0,
          subTotal: 0,
          shippingCost: 0,
        }}
        onSubmit={async (values, { setSubmitting, setValues }) => {
          const computedValue: IInvoice = {
            customer: values.customer,
            invoiceDate: new Date(values.invoiceDate).toUTCString(),
            payment: {
              method: values.method,
              transactionId: values.transactionId,
              cardNumber: values.cardNumber,
            },
            subject: values.subject,
            summary: values.summary,
            // @ts-ignore
            totalAmount: parseInt(values.totalAmount),
            // @ts-ignore
            tax: parseInt(values.tax),
            // @ts-ignore
            subTotal: parseInt(values.subTotal),
            // @ts-ignore
            shippingCost: parseInt(values.shippingCost),
          };

          const { data } = await axios.post<{
            data: IInvoice;
            created: boolean;
          }>('/invoices', computedValue);

          if (data.created) {
            addInvoice(data.data);
            toast({
              status: 'success',
              title: 'Invoice created',
              isClosable: true,
              duration: 5000,
            });
            setSubmitting(false);
            onClose();
          }
        }}
      >
        {({ isSubmitting, getFieldProps }) => (
          <Form>
            <ModalContent>
              <ModalHeader>New Invoice</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    placeholder="Subject"
                    {...getFieldProps('subject')}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Summary</FormLabel>
                  <Input
                    placeholder="Summary"
                    {...getFieldProps('summary')}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Invoice Date</FormLabel>
                  <Input
                    placeholder="invoiceDate"
                    {...getFieldProps('invoiceDate')}
                    type="date"
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>transactionId</FormLabel>
                  <Input
                    placeholder="transactionId"
                    {...getFieldProps('transactionId')}
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Card Number</FormLabel>
                  <Input
                    placeholder="Card Number"
                    {...getFieldProps('cardNumber')}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Method</FormLabel>
                  <Input
                    placeholder="Method"
                    {...getFieldProps('method')}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>TotalAmount</FormLabel>
                  <Input
                    placeholder="TotalAmount"
                    {...getFieldProps('totalAmount')}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Sub Total</FormLabel>
                  <Input
                    placeholder="subTotal"
                    {...getFieldProps('subTotal')}
                    type="number"
                    min={0}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>tax</FormLabel>
                  <Input
                    placeholder="tax"
                    {...getFieldProps('tax')}
                    type="number"
                    min={0}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>shippingCost</FormLabel>
                  <Input
                    placeholder="shippingCost"
                    {...getFieldProps('shippingCost')}
                    type="number"
                    min={0}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Customer</FormLabel>
                  <Select
                    required
                    placeholder="select customer"
                    {...getFieldProps('customer')}
                  >
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.firstName} {c.lastName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateInvoiceModal;
