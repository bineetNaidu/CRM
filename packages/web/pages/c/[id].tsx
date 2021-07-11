import { FC } from 'react';
import type { ICustomer } from '@crm/common';
import { axios } from '../../lib/axios';
import { GetServerSideProps } from 'next';
import { FiEdit, FiMail, FiPhone, FiTrash } from 'react-icons/fi';
import { IoMdTimer } from 'react-icons/io';
import { Avatar, Box, Button, Flex, Stack, Text } from '@chakra-ui/react';

type Data = {
  data: ICustomer;
  success: boolean;
};

interface Props {
  data: Data;
}

const Customer: FC<Props> = ({ data }) => {
  return (
    <Box px="5">
      <Flex alignItems="center">
        <Avatar src={data.data.avatar} name={data.data.firstName} size="2xl" />
        <Box ml="4">
          <Text color="gray.600">ID: {data.data.id}</Text>
          <Text fontSize="3xl" fontWeight="bold">
            {data.data.firstName} {data.data.lastName}
          </Text>
        </Box>
        <Box ml="4">
          <Flex alignItems="center" color="gray.400">
            <FiMail /> <Text ml="2">{data.data.email}</Text>
          </Flex>
          <Flex alignItems="center" color="gray.400">
            <FiPhone />
            <Text ml="2">{data.data.phoneNumber}</Text>
          </Flex>
          <Flex alignItems="center" color="gray.400">
            <IoMdTimer /> <Text ml="2">{data.data.timezone}</Text>
          </Flex>
        </Box>
        <Stack direction="row" spacing={4} ml="4">
          <Button leftIcon={<FiTrash />} colorScheme="red" variant="outline">
            Delete
          </Button>
          <Button rightIcon={<FiEdit />} colorScheme="purple" variant="outline">
            Edit
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get<Data>(`/customers/${params!.id}`);

  return {
    props: { data },
  };
};

export default Customer;
