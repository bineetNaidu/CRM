import { FC, useCallback, useEffect } from 'react';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { IDeal } from '../../common/src';
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
      <Flex wrap="wrap">
        {deals.map((d) => (
          <DealCard deal={d} key={d.id!} customerId={customerId} />
        ))}
      </Flex>
    </Box>
  );
};

export default DealsPanel;
