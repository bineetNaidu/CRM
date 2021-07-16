import { FC } from 'react';
import type { ICustomer } from '@crm/common';
import { axios } from '../../lib/axios';
import { GetServerSideProps } from 'next';
import { FiEdit, FiMail, FiPhone, FiTrash } from 'react-icons/fi';
import { IoMdTimer } from 'react-icons/io';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react';
import { useCustomerStore } from '../../lib/customer.store';
import { useRouter } from 'next/dist/client/router';
import EditCustomerModal from '../../components/EditCustomerModal';
import NotesPanel from '../../components/NotesPanel';
import DealsPanel from '../../components/DealsPanel';

type Data = {
  data: ICustomer;
  success: boolean;
};

interface Props {
  data: Data;
}

const Customer: FC<Props> = ({ data }) => {
  const { deleteCustomer } = useCustomerStore();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const r = useRouter();

  const handleDeleteCustomer = async () => {
    const res = await axios.delete(`/customers/${data.data.id}`);
    if (res.data.deleted && res.data.deletedCustomerId) {
      deleteCustomer(res.data.deletedCustomerId);
      r.push('/');
    }
  };
  return (
    <Box px="5">
      <EditCustomerModal
        customer={data.data}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex alignItems="center">
        <Flex alignItems="center" flexDirection={['column', 'column', 'row']}>
          <Avatar
            src={data.data.avatar}
            name={data.data.firstName}
            size="2xl"
          />
          <Box ml="4">
            <Text color="gray.600" display={['none', 'block']}>
              ID: {data.data.id}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {data.data.firstName} {data.data.lastName}
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection={['column', 'column', 'row']}>
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
          <Box>
            <Stack direction="row" spacing={4} ml="4">
              <Button
                size="sm"
                leftIcon={<FiTrash />}
                colorScheme="red"
                variant="outline"
                onClick={handleDeleteCustomer}
              >
                <Text display={['none', 'block']}>Delete</Text>
              </Button>
              <Button
                size="sm"
                rightIcon={<FiEdit />}
                colorScheme="purple"
                variant="outline"
                onClick={onOpen}
              >
                <Text display={['none', 'block']}>Edit</Text>
              </Button>
            </Stack>
            <Stack direction="row" spacing={4} ml="4" mt="2">
              <Button
                size="sm"
                leftIcon={<FiMail />}
                colorScheme="linkedin"
                variant="outline"
              >
                <Text display={['none', 'block']}>Send Email</Text>
              </Button>
              <Button
                size="sm"
                rightIcon={<FiPhone />}
                colorScheme="green"
                variant="outline"
              >
                <Text display={['none', 'block']}>Make A Call</Text>
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Flex>
      <Tabs isFitted variant="enclosed" my="5" defaultIndex={0}>
        <TabList mb="1em">
          <Tab>Overview</Tab>
          <Tab>Deals</Tab>
          <Tab>Notes</Tab>
          <Tab>Activities</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Overview Tab</p>
          </TabPanel>
          <TabPanel>
            <DealsPanel customerId={data.data.id!} />
          </TabPanel>
          <TabPanel>
            <NotesPanel customerId={data.data.id!} />
          </TabPanel>
          <TabPanel>
            <p>Activities Tab</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
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
