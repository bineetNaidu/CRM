import { useEffect, useState, useCallback } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Box, Heading } from '@chakra-ui/layout';
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import { FiCheck, FiSearch } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import CreateCustomerModal from '../components/CreateCustomerModal';
import { useCustomerStore } from '../lib/customer.store';
import type { ICustomer } from '@crm/common';
import { axios } from '../lib/axios';
import { Formik, Form } from 'formik';
import { CustomerCard } from '../components/CustomerCard';

type Data = {
  data: ICustomer[];
  length: number;
  success: boolean;
};

export default function Clients({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { customers, setCustomer } = useCustomerStore();
  const [filters, setFilters] = useState<{
    data: ICustomer[];
    isFiltered: boolean;
  }>({
    data: [],
    isFiltered: false,
  });

  const handleFuzzSearch = useCallback(async (query: string) => {
    const { data } = await axios.get<{
      data: ICustomer[];
      length: number;
      success: boolean;
    }>(`/customers/search?name=${query}`);
    if (data.success) {
      setFilters({
        data: data.data,
        isFiltered: true,
      });
    }
  }, []);

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
        <Formik
          initialValues={{ query: '' }}
          onSubmit={async (values, { setSubmitting, setValues }) => {
            await handleFuzzSearch(values.query);
            setValues({ query: '' });
            setSubmitting(false);
          }}
        >
          {({ getFieldProps }) => (
            <Form>
              <InputGroup my="4" width="96">
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search People"
                  rounded="3xl"
                  {...getFieldProps('query')}
                />
                <button type="submit" hidden>
                  Search!
                </button>
              </InputGroup>
            </Form>
          )}
        </Formik>
        {filters.isFiltered && (
          <Button
            leftIcon={<FiCheck />}
            colorScheme="whiteAlpha"
            variant="outline"
            color="gray.500"
            onClick={() => setFilters({ isFiltered: false, data: [] })}
          >
            Clear Filter?
          </Button>
        )}
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
        {filters.isFiltered
          ? filters.data.map((c) => <CustomerCard key={c.id} customer={c} />)
          : customers.map((c) => <CustomerCard customer={c} key={c.id} />)}
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
