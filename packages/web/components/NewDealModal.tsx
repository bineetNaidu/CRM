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
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { axios } from '../lib/axios';
import type { IDeal } from '@crm/common';
import { useDealsStore } from '../lib/deals.store';

interface Props {
  customerId: string;
  onClose: () => void;
  isOpen: boolean;
}

const NewDealModal: FC<Props> = ({ customerId, isOpen, onClose }) => {
  const addDeal = useDealsStore((s) => s.addDeal);
  return (
    <Modal motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Formik
        initialValues={{
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          estimatedTime: '',
          status: '',
        }}
        onSubmit={async (values, { setSubmitting, setValues }) => {
          const computedValues = {
            name: values.name,
            description: values.description,
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString(),
            estimatedTime: new Date(new Date(values.estimatedTime)).getTime(),
            status: values.status,
          };
          const { data } = await axios.post<{
            data: IDeal;
            created: boolean;
            success: boolean;
          }>(`/customers/${customerId}/deals`, computedValues);
          if (data.success && data.created) {
            addDeal(data.data);
            setSubmitting(false);
            setValues({
              name: '',
              description: '',
              startDate: '',
              endDate: '',
              estimatedTime: '',
              status: '',
            });
            onClose();
          }
        }}
      >
        {({ isSubmitting, getFieldProps }) => (
          <Form>
            <ModalContent>
              <ModalHeader>New Deal</ModalHeader>
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
                  <FormLabel>Start Date</FormLabel>
                  <Input {...getFieldProps('startDate')} type="date" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>End Date</FormLabel>
                  <Input {...getFieldProps('endDate')} type="date" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Estimated Time</FormLabel>
                  <Input {...getFieldProps('estimatedTime')} type="date" />
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

export default NewDealModal;
