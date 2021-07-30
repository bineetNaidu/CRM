/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useCallback } from 'react';
import type { ICustomer, IInvoice } from '@crm/common';
import { axios } from '../../lib/axios';
import { useInvoiceStore } from '../../lib/invoice.store';
import {
  Avatar,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { MdAttachMoney, MdDateRange } from 'react-icons/md';

const Invoices = () => {
  const { setInvoices, invoices } = useInvoiceStore((s) => s);

  const getInvoices = useCallback(async () => {
    const { data } = await axios.get<{
      data: IInvoice[];
      length: number;
      success: boolean;
    }>('/invoices');
    setInvoices(data.data);
  }, [setInvoices]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  return (
    <div>
      <h1>INVOICE LIST</h1>

      <Flex mt="5" wrap="wrap" justifyContent="center">
        {invoices.map((i) => (
          <Flex
            key={i.id}
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <VStack>
              <Avatar src={(i.customer as ICustomer).avatar} size={'lg'} />
              <Text>
                {(i.customer as ICustomer).firstName}{' '}
                {(i.customer as ICustomer).lastName}
              </Text>
            </VStack>
            <VStack>
              <Text as={Link} href={`/invoices/${i.id}`}>
                Invoice {i.id}
              </Text>
              <Text>{i.subject}</Text>
              <Flex>
                <Flex>
                  <Icon mr="2" as={MdAttachMoney} />
                  <Text>{i.totalAmount}</Text>
                </Flex>
                <Flex>
                  <Icon mr="2" as={MdDateRange} />
                  <Text>{dayjs(i.invoiceDate).format('DD/MM/YYYY')}</Text>
                </Flex>
              </Flex>
            </VStack>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default Invoices;
