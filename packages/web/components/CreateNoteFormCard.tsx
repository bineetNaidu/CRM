import { FC } from 'react';
import {
  Box,
  Button,
  Select,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import type { INote } from '@crm/common';
import { Formik, Form } from 'formik';
import { useNotesStore } from '../lib/notes.store';
import { axios } from '../lib/axios';

interface Props {
  customerId: string;
}

export const CreateNoteFormCard: FC<Props> = ({ customerId }) => {
  const addNote = useNotesStore((s) => s.addNote);
  return (
    <Box
      maxW={'250px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Formik
        initialValues={{ body: '', category: 'planning' }}
        onSubmit={async (values, { setSubmitting, setValues }) => {
          const { data } = await axios.post<{
            data: INote;
            created: boolean;
            success: boolean;
          }>(`/customers/${customerId}/notes`, values);

          if (data.created && data.success) {
            addNote(data.data);
            setValues({ body: '', category: 'planning' });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, getFieldProps }) => (
          <Form>
            <Select
              placeholder="Select Category"
              {...getFieldProps('category')}
            >
              <option value="planning">planning</option>
              <option value="inProgress">inProgress</option>
              <option value="finalized">finalized</option>
              <option value="done">done</option>
            </Select>
            <Textarea
              placeholder="Your Note"
              {...getFieldProps('body')}
              my="2"
            />
            <Button
              colorScheme="teal"
              size="sm"
              type="submit"
              w="full"
              isLoading={isSubmitting}
            >
              Add Note!
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
