import { FC, useState } from 'react';
import { Badge, Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { FcCheckmark } from 'react-icons/fc';
import type { IDeal } from '../../common/src';
import dayjs from 'dayjs';
import { IoMdTimer } from 'react-icons/io';

interface Props {
  deal: IDeal;
  customerId: string;
}

const DealCard: FC<Props> = ({ deal }) => {
  const [truncated, setTruncated] = useState(true);
  const toggleTruncated = () => setTruncated(!truncated);

  return (
    <Box
      maxW={'300px'}
      w={'full'}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={4}
      m="4"
      position="relative"
    >
      <Text fontSize="xl" display="flex" alignItems="center" fontWeight="bold">
        {deal.name}{' '}
        {deal.status === 'done' ? (
          <FcCheckmark style={{ marginLeft: '5px' }} />
        ) : null}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" my="2">
        <Badge>
          <Tooltip label="Start Date" aria-label="startDate">
            {dayjs(deal.startDate).format('DD/MM/YYYY')}
          </Tooltip>
        </Badge>
        <IoMdTimer />
        <Badge>
          <Tooltip label="End Date" aria-label="endDate">
            {dayjs(deal.endDate).format('DD/MM/YYYY')}
          </Tooltip>
        </Badge>
      </Flex>
      <Text fontSize="md" color="gray.500" isTruncated={truncated}>
        {deal.description}
        <Text
          fontSize="sm"
          color="blue.500"
          cursor="pointer"
          textDecoration="underline"
          onClick={toggleTruncated}
        >
          Read More
        </Text>
      </Text>
    </Box>
  );
};

export default DealCard;
