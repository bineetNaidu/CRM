import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Box, Heading } from '@chakra-ui/layout';
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  useDisclosure,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import CreateCustomerModal from '../components/CreateCustomerModal';
import { useCustomerStore } from '../lib/customer.store';
import type { ICustomer } from '@crm/common';
import { axios } from '../lib/axios';
import { CustomerCard } from '../components/CustomerCard';

type Data = {
  data: ICustomer[];
  length: number;
  success: boolean;
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { customers, setCustomer } = useCustomerStore();

  useEffect(() => {
    if (data) {
      setCustomer(data.data);
    }
  }, [data, setCustomer]);

  return (
    <Box mx="5">
      <CreateCustomerModal isOpen={isOpen} onClose={onClose} />
      <Heading>{customers.length} People</Heading>
      <HStack spacing={['5']}>
        <InputGroup my="4" width="96">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search People" rounded="3xl" />
        </InputGroup>

        <Button
          leftIcon={<GrAdd />}
          colorScheme="gray"
          variant="outline"
          rounded="3xl"
          py="5"
          fontSize="sm"
          onClick={onOpen}
        >
          Add Customer
        </Button>
      </HStack>

      <SimpleGrid my="5" columns={[1, 2, 3]} spacing={10}>
        {!customers ? (
          <Spinner />
        ) : (
          customers.map((c) => <CustomerCard customer={c} key={c.id} />)
        )}
      </SimpleGrid>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<Data>('/customers');
  return {
    props: { data },
  };
};
