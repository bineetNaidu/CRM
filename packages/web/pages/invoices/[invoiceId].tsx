import NextLink from 'next/link';
import { FC, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import type { ICustomer, IInvoice } from '@crm/common';
import { axios } from '../../lib/axios';
import {
  Box,
  Text,
  Heading,
  Divider,
  Flex,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useInvoiceStore } from '../../lib/invoice.store';

const Invoice: FC<{ data: IInvoice }> = ({ data }) => {
  const r = useRouter();
  const deleteInvoice = useInvoiceStore((s) => s.deleteInvoice);

  const handleDeleteInvoice = useCallback(async () => {
    const res = await axios.delete<{
      deletedInvoiceId: string;
      deleted: boolean;
    }>(`/invoices/${data.id}`);

    if (res.data.deleted && res.data.deletedInvoiceId === data.id) {
      deleteInvoice(res.data.deletedInvoiceId);
      r.push('/invoices');
    }
  }, [data.id, deleteInvoice, r]);

  return (
    <Box w="full" h="full">
      <Box m="5" rounded="md" p="5" bgColor="gray.800">
        <Flex px="5" justifyContent="space-between" alignItems="center">
          <Box>
            <Heading>Invoice details</Heading>
            <Text mt="2" color="gray.500">
              ID {data.id}
            </Text>
          </Box>
          <NextLink href={`/c/${(data.customer as ICustomer).id}`}>
            <Box textAlign="center" cursor="pointer">
              <Avatar src={(data.customer as ICustomer).avatar} />
              <Text>
                {(data.customer as ICustomer).firstName}{' '}
                {(data.customer as ICustomer).lastName}
              </Text>
            </Box>
          </NextLink>
        </Flex>
        <Divider my="3" />
        <Box px="5">
          <Flex justifyContent="space-between">
            <Box>
              <Text fontSize="xl">Invoice date</Text>
              <Text fontSize="md" color="gray.400">
                {data.invoiceDate}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">Transaction Id</Text>
              <Text fontSize="md" color="gray.400">
                {data.payment.transactionId}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" my="5">
            <Box>
              <Text fontSize="xl">Payment method</Text>
              <Text fontSize="md" color="gray.400">
                {data.payment.method}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">Card Number</Text>
              <Text fontSize="md" color="gray.400">
                {data.payment.cardNumber}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Text fontSize="xl">Subject</Text>
            <Text fontSize="md" color="gray.400">
              {data.subject}
            </Text>
          </Box>
          <Box my="5">
            <Text fontSize="xl">Summary</Text>
            <Text fontSize="md" color="gray.400">
              {data.summary}
            </Text>
          </Box>
          <Divider my="3" />
          <Flex alignItems="flex-end" flexDirection="column">
            {data.tax !== 0 ? (
              <Flex alignItems="center">
                <Text fontSize="xl">Tax:</Text>
                <Text fontSize="xl" ml="2" color="gray.400">
                  {data.tax}
                </Text>
              </Flex>
            ) : null}
            {data.shippingCost !== 0 ? (
              <Flex alignItems="center">
                <Text fontSize="xl">Shipping Cost:</Text>
                <Text fontSize="xl" ml="2" color="gray.400">
                  {data.shippingCost}
                </Text>
              </Flex>
            ) : null}
            {data.subTotal !== 0 ? (
              <Flex alignItems="center">
                <Text fontSize="xl">Sub Total:</Text>
                <Text fontSize="xl" ml="2" color="gray.400">
                  {data.subTotal}
                </Text>
              </Flex>
            ) : null}
            <Flex alignItems="center">
              <Text fontSize="xl">Total:</Text>
              <Text fontSize="xl" ml="2" color="gray.400">
                {data.totalAmount}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Flex justifyContent="flex-end" my="4" pr="5">
        <Button mr="2" colorScheme="red" onClick={handleDeleteInvoice}>
          Delete Invoice
        </Button>
        <Button>Print Invoice</Button>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get<{
    data: IInvoice;
    success: boolean;
  }>(`/invoices/${params!.invoiceId}`);

  return {
    props: {
      data: data.data,
    },
  };
};

export default Invoice;
