import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Select,
  Flex,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { axios } from '../lib/axios';
import type { IDeal } from '@crm/common';
import { useDealsStore } from '../lib/deals.store';

interface Props {
  customerId: string;
  deal: IDeal;
  onClose: () => void;
  isOpen: boolean;
}

const EditDealModal: FC<Props> = ({ isOpen, onClose, deal, customerId }) => {
  const updateDeal = useDealsStore((s) => s.updateDeal);
  return (
    <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{
          name: deal.name,
          description: deal.description,
          status: deal.status,
        }}
        onSubmit={async (values, { setSubmitting, setValues }) => {
          const computedValues = {
            name: values.name,
            description: values.description,
            status: values.status,
          };
          const { data } = await axios.put<{
            data: IDeal;
            updated: boolean;
            success: boolean;
          }>(`/customers/${customerId!}/deals/${deal.id!}`, computedValues);
          if (data.updated) {
            updateDeal(data.data.id!, data.data);
            setSubmitting(false);
            setValues({
              name: data.data.name,
              description: data.data.description,
              status: data.data.status,
            });
            onClose();
          }
        }}
      >
        {({ isSubmitting, getFieldProps }) => (
          <Form>
            <ModalContent>
              <ModalHeader>
                <Flex alignItems="center">
                  <Text>Update Deal</Text>
                  <Text color="gray.500" fontSize="sm" ml="3">
                    (#{deal.id})
                  </Text>
                </Flex>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Name" {...getFieldProps('name')} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Description"
                    {...getFieldProps('description')}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    placeholder="Select status"
                    {...getFieldProps('status')}
                  >
                    <option value="planning">planning</option>
                    <option value="inProgress">inProgress</option>
                    <option value="finalized">finalized</option>
                    <option value="done">done</option>
                  </Select>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditDealModal;
