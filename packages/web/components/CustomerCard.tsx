import { FC } from 'react';
import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import type { ICustomer } from '@crm/common';
import { FiMail, FiLink } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  customer: ICustomer;
}

export const CustomerCard: FC<Props> = ({ customer }) => {
  return (
    <Box
      maxW={'280px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'2xl'}
      p={6}
      textAlign={'center'}
    >
      <Avatar
        size={'xl'}
        src={customer.avatar}
        alt={'Avatar Alt'}
        mb={4}
        pos={'relative'}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {customer.firstName} {customer.lastName}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        {customer.email}
      </Text>

      <Stack mt={8} direction={'row'} spacing={4}>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          leftIcon={<FiMail />}
          _focus={{
            bg: 'gray.200',
          }}
        >
          Email
        </Button>
        <Link href={`/c/${customer.id}`} passHref>
          <Button
            flex={1}
            leftIcon={<FiLink />}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            View
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};
