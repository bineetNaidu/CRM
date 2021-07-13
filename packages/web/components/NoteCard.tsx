import { FC } from 'react';
import { Badge, Box } from '@chakra-ui/react';
import type { INote, NoteCategoryTypes } from '@crm/common';

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
      p={6}
      m="4"
      position="relative"
    >
      <Badge position="absolute" top="4" right="4">
        {note.category}
      </Badge>
      <Box mt="5" overflowY="auto" height="100">
        <p>{note.body}</p>
      </Box>
    </Box>
  );
};
