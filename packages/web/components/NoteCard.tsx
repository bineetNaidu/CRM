import React, { FC, useRef } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  Button,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import type { INote } from '@crm/common';
import { Form, Formik } from 'formik';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { axios } from '../lib/axios';
import { useNotesStore } from '../lib/notes.store';

interface Props {
  note: INote;
  customerId: string;
}

export const NoteCard: FC<Props> = ({ note, customerId }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const textareaRef = useRef<any>(null);
  const { updateNote } = useNotesStore((s) => s);

  return (
    <Box
      maxW={'250px'}
      maxH="250px"
      w={'full'}
      bgColor={note.bgColor}
      boxShadow={'2xl'}
      rounded={'lg'}
      px={4}
      m="4"
      position="relative"
    >
      <Box mt="5" overflowY="auto" height="100">
        <p>{note.body}</p>
      </Box>
      <Box position="absolute" top="2" right="2">
        <IconButton
          aria-label="Delete button"
          mr="2"
          size="sm"
          icon={<FiTrash />}
        />

        <Popover
          isOpen={isOpen}
          initialFocusRef={textareaRef}
          onOpen={onOpen}
          onClose={onClose}
          placement="right"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton aria-label="Edit button" size="sm" icon={<FiEdit />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <Box returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Formik
                initialValues={{ body: note.body }}
                onSubmit={async (values, { setSubmitting }) => {
                  const { data } = await axios.put<{
                    data: INote;
                    updated: boolean;
                  }>(`/customers/${customerId}/notes/${note.id}`, values);
                  if (data.updated) {
                    updateNote(data.data.id!, data.data);
                    setSubmitting(false);
                    onClose();
                  }
                }}
              >
                {({ isSubmitting, getFieldProps, values }) => (
                  <Form>
                    <Stack spacing={4}>
                      <Textarea
                        ref={textareaRef}
                        placeholder="Your Note"
                        {...getFieldProps('body')}
                        my="2"
                        value={values.body}
                      />
                      <Button
                        w="100"
                        isLoading={isSubmitting}
                        colorScheme="teal"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Box>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};
