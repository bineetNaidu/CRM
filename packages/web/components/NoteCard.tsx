import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import type { INote } from '@crm/common';

interface Props {
  note: INote;
}

export const NoteCard: FC<Props> = ({ note }) => {
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
    </Box>
  );
};
