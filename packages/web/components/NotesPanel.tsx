import { FC, useEffect, useCallback } from 'react';
import { axios } from '../lib/axios';
import { useNotesStore } from '../lib/notes.store';
import type { INote } from '@crm/common';
import { Box, Text, Flex } from '@chakra-ui/react';
import { CreateNoteFormCard } from './CreateNoteFormCard';
import { NoteCard } from './NoteCard';

interface Props {
  customerId: string;
}

const NotesPanel: FC<Props> = ({ customerId }) => {
  const { setNotes, clearNotes, notes } = useNotesStore((s) => s);

  const handleGetNotes = useCallback(async () => {
    const { data } = await axios.get<{
      data: INote[];
      length: number;
      success: boolean;
    }>(`/customers/${customerId}/notes`);

    return data;
  }, [customerId]);

  useEffect(() => {
    handleGetNotes().then(({ data, success }) => {
      if (success) setNotes(data);
    });
    return () => {
      clearNotes();
    };
  }, [clearNotes, handleGetNotes, setNotes]);

  return (
    <Box>
      <Text color="gray.500" fontSize="xl">
        Your Notes ({notes.length})
      </Text>
      <Flex>
        {notes.map((n) => (
          <NoteCard note={n} key={n.id} />
        ))}
        <CreateNoteFormCard customerId={customerId} />
      </Flex>
    </Box>
  );
};

export default NotesPanel;
