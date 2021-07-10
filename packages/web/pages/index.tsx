import { Box, Heading } from '@chakra-ui/layout';
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { GrAdd } from 'react-icons/gr';
import CreateCustomerModal from '../components/CreateCustomerModal';
import { useCustomerStore } from '../lib/customer.store';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const customers = useCustomerStore((s) => s.customers);
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
    </Box>
  );
}
