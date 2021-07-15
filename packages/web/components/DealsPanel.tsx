import { FC, useCallback, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { IDeal } from '../../common/src';
import { axios } from '../lib/axios';
import { useDealsStore } from '../lib/deals.store';

interface Props {
  customerId: string;
}

const DealsPanel: FC<Props> = ({ customerId }) => {
  const { setDeals, deals, clearDeals } = useDealsStore((s) => s);

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
      <Text color="gray.500" fontSize="xl">
        Your Deals ({deals.length})
      </Text>
      <Flex wrap="wrap">
        {/* {deals.map((n) => (
        <DealCard Deal={n} key={n.id} customerId={customerId} />
      ))} */}
        <pre>{JSON.stringify(deals, null, 2)}</pre>
      </Flex>
    </Box>
  );
};

export default DealsPanel;
