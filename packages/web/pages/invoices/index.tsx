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
  Button,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import dayjs from 'dayjs';
import { MdAttachMoney, MdDateRange } from 'react-icons/md';
import CreateInvoiceModal from '../../components/CreateInvoiceModal';

const Invoices = () => {
  const { setInvoices, invoices } = useInvoiceStore((s) => s);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
      <Flex alignItems="center">
        <Text>INVOICE LIST</Text>
        <Button ml="5" onClick={onOpen} size="sm">
          Add Invoice
        </Button>
      </Flex>

      <CreateInvoiceModal isOpen={isOpen} onClose={onClose} />

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
              <NextLink href={`/invoices/${i.id}`} passHref>
                <Link>
                  <Flex alignItems="center">
                    <Text fontSize="md">Invoice</Text>{' '}
                    <Text fontSize="x-small" pl="2" color="gray">
                      {i.id}
                    </Text>
                  </Flex>
                </Link>
              </NextLink>
              <Text>{i.subject}</Text>
              <Flex justifyContent="space-between" w="full" px="3">
                <Flex alignItems="center">
                  <Icon as={MdAttachMoney} />
                  <Text>{i.totalAmount}</Text>
                </Flex>
                <Flex alignItems="center">
                  <Icon as={MdDateRange} />
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
