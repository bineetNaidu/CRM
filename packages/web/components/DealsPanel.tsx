import { FC, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import type { IDeal, StatusTypes } from '../../common/src';
import { axios } from '../lib/axios';
import { FiPlus } from 'react-icons/fi';
import { useDealsStore } from '../lib/deals.store';
import DealCard from './DealCard';
import NewDealModal from './NewDealModal';

interface Props {
  customerId: string;
}

const DealsPanel: FC<Props> = ({ customerId }) => {
  const { setDeals, deals, clearDeals } = useDealsStore((s) => s);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleGetDeals = useCallback(async () => {
    const { data } = await axios.get<{
      data: IDeal[];
      length: number;
      success: boolean;
    }>(`/customers/${customerId}/deals`);

    return data;
  }, [customerId]);

  useEffect(() => {
    handleGetDeals().then(({ data, success }) => {
      if (success) setDeals(data);
    });
    return () => {
      clearDeals();
    };
  }, [clearDeals, handleGetDeals, setDeals]);

  return (
    <Box>
      <NewDealModal customerId={customerId} isOpen={isOpen} onClose={onClose} />
      <Flex alignItems="center">
        <Text color="gray.500" fontSize="xl">
          Your Deals ({deals.length})
        </Text>
        <Button
          colorScheme="whatsapp"
          variant="outline"
          size="sm"
          mx="5"
          onClick={onOpen}
          leftIcon={<FiPlus />}
        >
          New Deal
        </Button>
      </Flex>
      <SimpleGrid columns={[2, 2, 3]} spacing={20}>
        <Box
          border="3px"
          my="2"
          minH="sm"
          borderColor="gray.600"
          borderStyle="dashed"
          rounded="md"
          p="3"
        >
          <Text
            fontWeight="bold"
            textDecoration="underline"
            letterSpacing="wide"
            fontSize="lg"
            color="gray.400"
          >
            Planning Deal
          </Text>
          <br />
          {deals.map(
            (d) =>
              d.status === 'planning' && (
                <DealCard deal={d} key={d.id!} customerId={customerId} />
              )
          )}
        </Box>
        <Box
          border="3px"
          my="2"
          minH="sm"
          borderColor="gray.600"
          borderStyle="dashed"
          rounded="md"
          p="3"
        >
          <Text
            fontWeight="bold"
            textDecoration="underline"
            letterSpacing="wide"
            fontSize="lg"
            color="gray.400"
          >
            InProgress Deal
          </Text>
          <br />

          {deals.map(
            (d) =>
              d.status === 'inProgress' && (
                <DealCard deal={d} key={d.id!} customerId={customerId} />
              )
          )}
        </Box>
        <Box
          border="3px"
          my="2"
          minH="sm"
          borderColor="gray.600"
          borderStyle="dashed"
          rounded="md"
          p="3"
        >
          <Text
            fontWeight="bold"
            textDecoration="underline"
            letterSpacing="wide"
            fontSize="lg"
            color="gray.400"
          >
            Finalized Deal
          </Text>
          <br />
          {deals.map(
            (d) =>
              d.status === 'finalized' && (
                <DealCard deal={d} key={d.id!} customerId={customerId} />
              )
          )}
        </Box>
        <Box
          border="3px"
          my="2"
          minH="sm"
          borderColor="gray.600"
          borderStyle="dashed"
          rounded="md"
          p="3"
        >
          <Text
            fontWeight="bold"
            textDecoration="underline"
            letterSpacing="wide"
            fontSize="lg"
            color="gray.400"
          >
            Done Deal
          </Text>
          <br />
          {deals.map(
            (d) =>
              d.status === 'done' && (
                <DealCard deal={d} key={d.id!} customerId={customerId} />
              )
          )}
        </Box>
      </SimpleGrid>
      {/* <Flex wrap="wrap">
        {deals.map((d) => (
          <DealCard deal={d} key={d.id!} customerId={customerId} />
        ))}
      </Flex> */}
    </Box>
  );
};

export default DealsPanel;
