import { FC } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Input,
  DrawerFooter,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useCustomerStore } from '../lib/customer.store';
import { axios } from '../lib/axios';
import type { ICustomer } from '@crm/common';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCustomerModal: FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const addCustomer = useCustomerStore((s) => s.addCustomer);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          Create a new account
        </DrawerHeader>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            timezone: '',
            avatar: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const { data } = await axios.post<{
              data: ICustomer;
              success: boolean;
            }>('/customers', values);
            addCustomer(data.data);
            setSubmitting(false);
            toast({
              isClosable: true,
              duration: 3000,
              title: '🎉 Added Customer!',
              status: 'success',
            });
            onClose();
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <Form>
              <DrawerBody overflowY="scroll" h="96">
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      {...getFieldProps('firstName')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      {...getFieldProps('lastName')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...getFieldProps('email')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Phone Number"
                      {...getFieldProps('phoneNumber')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="timezone">Timezone</FormLabel>
                    <Input
                      id="timezone"
                      placeholder="Timezone"
                      {...getFieldProps('timezone')}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="avatar">Avatar</FormLabel>
                    <Input
                      id="avatar"
                      placeholder="Avatar"
                      {...getFieldProps('avatar')}
                    />
                  </Box>
                </Stack>
              </DrawerBody>
              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </DrawerFooter>
            </Form>
          )}
        </Formik>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateCustomerModal;
