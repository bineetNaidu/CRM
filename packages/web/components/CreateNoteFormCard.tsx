import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Textarea,
} from '@chakra-ui/react';
import type { INote } from '@crm/common';
import { Formik, Form } from 'formik';
import { useNotesStore } from '../lib/notes.store';
import { axios } from '../lib/axios';
import { SketchPicker } from 'react-color';

interface Props {
  customerId: string;
}

export const CreateNoteFormCard: FC<Props> = ({ customerId }) => {
  const [bgc, setBgc] = useState('#3d4a91');
  const addNote = useNotesStore((s) => s.addNote);
  return (
    <Box
      maxW={'250px'}
      w={'full'}
      bgColor={bgc}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
    >
      <Formik
        initialValues={{ body: '', category: 'planning', bgColor: '#3d4a91' }}
        onSubmit={async (values, { setSubmitting, setValues }) => {
          const { data } = await axios.post<{
            data: INote;
            created: boolean;
            success: boolean;
          }>(`/customers/${customerId}/notes`, values);

          if (data.created && data.success) {
            addNote(data.data);
            setValues({ body: '', category: 'planning', bgColor: '#3d4a91' });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, getFieldProps, setFieldValue, values }) => (
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
            <Popover>
              <PopoverTrigger>
                <Button w="100">Select Color</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverHeader>Select Color! ({bgc})</PopoverHeader>
                <PopoverBody p="6">
                  <SketchPicker
                    color={values.bgColor}
                    onChangeComplete={(color) => {
                      setFieldValue('bgColor', color.hex);
                      setBgc(color.hex);
                    }}
                    width="100%"
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Button
              mt="2"
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
